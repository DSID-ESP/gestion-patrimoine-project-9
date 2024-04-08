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


    @Column(name = "USER_NAME", length = 7)
    private String userName;


    private Timestamp joinDate;

    private Timestamp lastLoginDate;
    private Timestamp lastLoginDateDisplay;


    @Column(name = "PWD")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String pwd;


    private boolean isActive;
    private boolean isNotLocked;


    @OneToOne
    @JoinColumn(name = "MATRICULE_AGENT")
    private Agent matriculeAgent;

    @ManyToOne
    @JoinColumn(name = "CODE_FONCTION_AGENT")
    private FonctionAgent codeFonctionAgent; // Set<FonctionAgent> : authorities


//    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
//    @JoinTable(
//            name = "UTILISATEUR_AUTHORITY",
//            joinColumns = @JoinColumn(name = "UTILISATEUR_ID"),
//            inverseJoinColumns = @JoinColumn(name = "CODE_AUTHORITY")
//    )
//    private Set<Authorities> authorities = new HashSet<>();


}
