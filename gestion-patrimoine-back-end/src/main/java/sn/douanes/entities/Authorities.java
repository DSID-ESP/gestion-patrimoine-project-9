package sn.douanes.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;



@Entity
@Table(name = "AUTHORITIES")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Authorities {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
//    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "CODE_AUTHORITY", nullable = false, updatable = false, length = 25)
    private Integer codeAuthority;


    @Column(name = "NAME_AUTHORITIES",length = 100)
    private String nameAuthority;


//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "UTILISATEUR_ID")
//    private Utilisateur utilisateurID;


}
