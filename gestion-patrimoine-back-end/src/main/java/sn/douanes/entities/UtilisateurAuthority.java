package sn.douanes.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import sn.douanes.entities.keys.UtilisateurAuthorityId;

@Entity
@IdClass(UtilisateurAuthorityId.class)
@Table(name = "UTILISATEUR_AUTHORITY")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UtilisateurAuthority {

    @Id
    @ManyToOne
    @JoinColumn(name = "UTILISATEUR_ID")
    private Utilisateur utilisateurID;

    @Id
    @ManyToOne
    @JoinColumn(name = "CODE_AUTHORITY")
    private Authorities codeAuthority;
}
