package sn.douanes.services;


import sn.douanes.entities.Authorities;

import java.util.List;

public interface AuthorityService {

    Authorities saveAuthority(Authorities c);
    Authorities updateAuthority(Authorities c);
    void deleteAuthority(Authorities c);
    void deleteAuthorityById(Integer id);
    Authorities getAuthorityById(Integer id);

//    Authorities getAuthorityByNameAuthority(String nameAuthority);


    List<Authorities> getAllAuthorities();


}

