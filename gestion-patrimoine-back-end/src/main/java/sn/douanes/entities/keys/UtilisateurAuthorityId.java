package sn.douanes.entities.keys;


import sn.douanes.entities.Authorities;
import sn.douanes.entities.Utilisateur;

import java.io.Serializable;


public class UtilisateurAuthorityId implements Serializable {

    private Utilisateur utilisateurID;
    private Authorities codeAuthority;


    public UtilisateurAuthorityId() {
    }
    public UtilisateurAuthorityId(Utilisateur utilisateurID, Authorities codeAuthority) {
        this.utilisateurID = utilisateurID;
        this.codeAuthority = codeAuthority;
    }

}
