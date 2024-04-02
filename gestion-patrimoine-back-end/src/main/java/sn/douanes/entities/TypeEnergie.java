package sn.douanes.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "TYPE_ENERGIE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TypeEnergie {

    @Id
    @Column(name = "CODE_TYPE_ENERGIE", length = 25, nullable = false)
    private String codeTypeEnergie;

    @Column(name = "LIBELLE_TYPE_ENERGIE", length = 100)
    private String libelleTypeEnergie;

}