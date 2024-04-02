package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.Agent;
import sn.douanes.entities.BonPour;
import sn.douanes.entities.BonSortie;
import sn.douanes.repositories.BonSortieRepository;
import sn.douanes.services.BonSortieService;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.format.DateTimeFormatter;
import java.util.List;


@Service
public class BonSortieServiceImpl implements BonSortieService {

    @Autowired
    BonSortieRepository bonSortieRepository;

    @Override
    public BonSortie saveBonSortie(BonSortie b) {
        return bonSortieRepository.save(b);
    }


    @Override
    public BonSortie updateBonSortie(BonSortie b) {
        return bonSortieRepository.save(b);
    }

    @Override
    public void deleteBonSortie(BonSortie b) {
        bonSortieRepository.delete(b);
    }

    @Override
    public void deleteBonSortieById(String id) {
        bonSortieRepository.deleteById(id);
    }

    @Override
    public BonSortie getBonSortieById(String id) {
        return bonSortieRepository.findById(id).isPresent() ? bonSortieRepository.findById(id).get() : null;
    }

    @Override
    public List<BonSortie> getAllBonSorties() {
        return bonSortieRepository.findAll();
    }

    @Override
    public BonSortie ajouterBonSortie(
            String numeroBonSortie,
            String descriptionBonSortie,
            Date dateBonSortie,
            Agent matriculeAgent,
            BonPour identifiantBonPour

    ) {

        BonSortie bonSortie = new BonSortie();



        bonSortie.setIdentifiantBonSortie(genererIdentifiantIdentifiantBonSortie("SG", genererDateEnregistrement(new Timestamp(System.currentTimeMillis()))));

        bonSortie.setNumeroBonSortie(numeroBonSortie);
        bonSortie.setDescriptionBonSortie(descriptionBonSortie);
        bonSortie.setDateBonSortie(new Date(System.currentTimeMillis()));
        bonSortie.setIdentifiantBonPour(identifiantBonPour);
        bonSortie.setMatriculeAgent(matriculeAgent);


        return bonSortieRepository.save(bonSortie);
    }


    private String genererIdentifiantIdentifiantBonSortie(String codeSection, String dateEnregistrement) {
        // Timestamp t = new Timestamp(System.currentTimeMillis())
        return "BS" + codeSection + dateEnregistrement;
    }


    private String genererDateEnregistrement(Timestamp dateEnregistrement) {
        // Timestamp t = new Timestamp(System.currentTimeMillis())
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS");
        return dateEnregistrement.toLocalDateTime().format(formatter);
    }

}
