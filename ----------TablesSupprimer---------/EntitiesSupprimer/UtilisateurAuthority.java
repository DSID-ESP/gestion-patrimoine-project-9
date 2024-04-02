package sn.douanes.EntitiesSupprimer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sn.douanes.entities.Authorities;
import sn.douanes.entities.Utilisateur;

import javax.persistence.*;

@Entity
@IdClass(UtilisateurAuthorityId.class)
//@Table(name = "utilisateur_authority")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UtilisateurAuthority {

    @Id
    @ManyToOne
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateurId;

    @Id
    @ManyToOne
    @JoinColumn(name = "code")
    private Authorities code;
}
