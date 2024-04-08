package sn.douanes.services.impl;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sn.douanes.exception.entities.*;
import sn.douanes.entities.Agent;
import sn.douanes.entities.Utilisateur;
import sn.douanes.repositories.AgentRepository;
import sn.douanes.repositories.UtilisateurRepository;
import sn.douanes.services.EmailService;
import sn.douanes.services.LoginAttemptService;
import sn.douanes.services.UtilisateurService;

import javax.mail.MessagingException;
import java.io.IOException;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import static org.apache.commons.lang3.StringUtils.EMPTY;
import static sn.douanes.constants.UserImplConstant.*;

@Service
@Transactional
@Qualifier("userDetailsService")
public class UtilisateurServiceImpl implements UtilisateurService {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private PasswordEncoder passwordEncoder;

    private UtilisateurRepository utilisateurRepository;


    // private BCryptPasswordEncoder passwordEncoder;
    private LoginAttemptService loginAttemptService;
    private EmailService emailService;

    private AgentRepository agentRepository;

    @Autowired
    public UtilisateurServiceImpl(UtilisateurRepository utilisateurRepository, LoginAttemptService loginAttemptService, EmailService emailService, AgentRepository agentRepository) {
        this.utilisateurRepository = utilisateurRepository;
        this.loginAttemptService = loginAttemptService;
        this.emailService = emailService;
        this.agentRepository = agentRepository;
    }

    @Override
    public List<Utilisateur> getUsers() {
        return utilisateurRepository.findAll();
    }

    @Override
    public Utilisateur getUserByUserName(String userName) {
        return utilisateurRepository.findByUserName(userName);
    }

    @Override
    public Utilisateur findByMatriculeAgent(Agent agent) {
        return utilisateurRepository.findByMatriculeAgent(agent);
    }

    @Override
    public Utilisateur registerUser(Utilisateur utilisateur) throws UserNotFoundException, AgentExistException, IOException, NotAnImageFileException, MessagingException {

        validateNewEmail(EMPTY, utilisateur.getMatriculeAgent().getEmailAgent());

        Utilisateur user = new Utilisateur();

        String userName = utilisateur.getMatriculeAgent().getMatriculeAgent();

        String clearPwd = utilisateur.getMatriculeAgent().getMatriculeAgent();
        String hashPwd = passwordEncoder.encode(clearPwd);
        user.setPwd(hashPwd);
        user.setJoinDate(new Timestamp(System.currentTimeMillis()));
        user.setMatriculeAgent(utilisateur.getMatriculeAgent());

        user.setUserName(userName);

        // user.setRole("ROLE_USER");
        // user.setAuthorities(utilisateur.getAuthorities());
        user.setCodeFonctionAgent(utilisateur.getCodeFonctionAgent());
        // utilisateur.setAuthorities(Role.ROLE_USER.getAuthorities());

        user.setActive(utilisateur.isActive());
        user.setNotLocked(utilisateur.isNotLocked());


        user.setActive(true);
        user.setNotLocked(true);

        utilisateurRepository.save(user);
        emailService.sendNewPasswordEmail(user.getMatriculeAgent().getPrenomAgent(), clearPwd, user.getMatriculeAgent().getEmailAgent());
        return user;
    }

    @Override
    public Utilisateur addNewUser(Utilisateur utilisateur) throws UserNotFoundException, AgentExistException, IOException, NotAnImageFileException, MessagingException {

        validateNewEmail(EMPTY, utilisateur.getMatriculeAgent().getEmailAgent());

        Utilisateur user = new Utilisateur();

        String userName = utilisateur.getMatriculeAgent().getMatriculeAgent();

        // String clearPwd = generatePassword();
        String clearPwd = utilisateur.getMatriculeAgent().getMatriculeAgent();
        String hashPwd = passwordEncoder.encode(clearPwd);
        user.setPwd(hashPwd);
        user.setJoinDate(new Timestamp(System.currentTimeMillis()));
        user.setMatriculeAgent(utilisateur.getMatriculeAgent());

        user.setUserName(userName);

        // user.setRole("ROLE_USER");
        // user.setRole(utilisateur.getRole());
        // user.setAuthorities(utilisateur.getAuthorities());
        user.setCodeFonctionAgent(utilisateur.getCodeFonctionAgent());

        user.setActive(true);
        user.setNotLocked(true);

        utilisateurRepository.save(user);
        // saveProfileImage(user, profileImage);
        // LOGGER.info("New user password: " + clearPwd);
        emailService.sendNewPasswordEmail(user.getMatriculeAgent().getPrenomAgent(), clearPwd, user.getMatriculeAgent().getEmailAgent());
        return user;
    }

    @Override
    public Utilisateur updateUser(Utilisateur utilisateur) throws UserNotFoundException, EmailExistException, IOException, NotAnImageFileException {

        Utilisateur user = utilisateurRepository.findByUserName(utilisateur.getUserName());

        if(user == null) {
            throw new UserNotFoundException(NO_USER_FOUND_BY_USERNAME + utilisateur.getUserName());
        }

        // user.setUtilisateurID(utilisateur.getUtilisateurID());
        // user.setAuthorities(utilisateur.getAuthorities());
        user.setCodeFonctionAgent(utilisateur.getCodeFonctionAgent());

        user.setActive(utilisateur.isActive());
        user.setNotLocked(utilisateur.isNotLocked());

        return utilisateurRepository.save(user);
    }

    @Override
    public void deleteUserByMatriculeAgent(Agent agent) throws IOException {

    }

    @Override
    public void resetPasswordByMatriculeAgent(Agent agent) throws MessagingException, AgentNotFoundException {

        Utilisateur user = utilisateurRepository.findByMatriculeAgent(agent);

        if (user == null) {
            throw new AgentNotFoundException(NO_USER_FOUND_BY_AGENT + agent.getPrenomAgent() + " " + agent.getNomAgent());
        }

        // String password = generatePassword();
        String password = agent.getMatriculeAgent();
        user.setPwd(encodePassword(password));

        utilisateurRepository.save(user);
        // LOGGER.info("New user password: " + password);
        emailService.sendNewPasswordEmail(user.getMatriculeAgent().getPrenomAgent(), password, user.getMatriculeAgent().getEmailAgent());
    }


    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    private String generatePassword() {
        return RandomStringUtils.randomAlphanumeric(10);
    }

    private String generateUserId() {
        return RandomStringUtils.randomNumeric(10);
    }

    private Utilisateur validateNewEmail(String currentEmail, String newEmail) throws UserNotFoundException, AgentExistException {

        Agent agent = agentRepository.findByEmailAgent(newEmail);
        Utilisateur userByNewAgent = utilisateurRepository.findByMatriculeAgent(agent);

        if(StringUtils.isNotBlank(currentEmail)) {

            Agent currentAgent = agentRepository.findByEmailAgent(currentEmail);
            Utilisateur currentUser = utilisateurRepository.findByMatriculeAgent(currentAgent);

            if(currentUser == null) {
                throw new UserNotFoundException(NO_USER_FOUND_BY_AGENT + agent.getPrenomAgent() + " " + agent.getNomAgent());
            }
            if(userByNewAgent != null && !currentUser.getUtilisateurID().equals(userByNewAgent.getUtilisateurID())) {
                throw new AgentExistException(AGENT_ALREADY_EXISTS);
            }

            return currentUser;

        } else {

            if(userByNewAgent != null) {
                throw new AgentExistException(AGENT_ALREADY_EXISTS);
            }

            return null;
        }
    }
}


