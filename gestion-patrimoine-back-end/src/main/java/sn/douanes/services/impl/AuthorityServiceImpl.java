package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.Authorities;
import sn.douanes.repositories.AuthoritiesRepository;
import sn.douanes.services.AuthorityService;

import java.util.List;


@Service
public class AuthorityServiceImpl implements AuthorityService {

    @Autowired
    AuthoritiesRepository authoritiesRepository;

    @Override
    public Authorities saveAuthority(Authorities a) {
        return authoritiesRepository.save(a);
    }

    @Override
    public Authorities updateAuthority(Authorities a) {
        return authoritiesRepository.save(a);
    }

    @Override
    public void deleteAuthority(Authorities a) {
        authoritiesRepository.delete(a);
    }

    @Override
    public void deleteAuthorityById(Integer id) {
        authoritiesRepository.deleteById(id);
    }

    @Override
    public Authorities getAuthorityById(Integer id) {
        return authoritiesRepository.findById(id).isPresent() ? authoritiesRepository.findById(id).get() : null;
    }

//    @Override
//    public Authorities getAuthorityByNameAuthority(String nameAuthority) {
//        return authoritiesRepository.findByNameAuthority(nameAuthority);
//    }



    @Override
    public List<Authorities> getAllAuthorities() {
        return authoritiesRepository.findAll();
    }




}
