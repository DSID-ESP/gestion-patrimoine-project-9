package sn.douanes.entities;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;


import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "UTILISATEUR")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY,generator = "native")
    @Column(name = "UTILISATEUR_ID", nullable = false, updatable = false, length = 25)
    private Integer utilisateurID;


    @OneToOne
    @JoinColumn(name = "MATRICULE_AGENT")
    private Agent matriculeAgent;

    @Column(name = "USER_NAME", length = 7)
    private String userName;


    private Timestamp joinDate;

    private Timestamp lastLoginDate;
    private Timestamp lastLoginDateDisplay;


    @Column(name = "MOT_DE_PASSE")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String motDePasse;


    private boolean isActive;
    private boolean isNotLocked;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinTable(
            name = "UTILISATEUR_AUTHORITY",
            joinColumns = @JoinColumn(name = "UTILISATEUR_ID"),
            inverseJoinColumns = @JoinColumn(name = "CODE_AUTHORITY")
    )
    private Set<Authorities> authorities = new HashSet<>();


    @OneToOne
    @JoinColumn(name = "CODE_FONCTION")
    private Fonctions codeFonction;


    public boolean getActive() {
        return this.isActive;
    }

    public boolean getNotLocked() {
        return this.isNotLocked;
    }


}
