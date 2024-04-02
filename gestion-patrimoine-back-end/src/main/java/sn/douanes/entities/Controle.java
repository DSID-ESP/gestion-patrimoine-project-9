package sn.douanes.entities;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sn.douanes.entities.keys.ControleId;

@Entity
@IdClass(ControleId.class)
@Table(name = "CONTROLE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Controle {


    @Id
    @Column(name = "NUMERO_SERIE", nullable = false)
    private String numeroSerie;

    @Id
    @Column(name = "DATE_CONTROLE", nullable = false)
    private Timestamp dateControle;

    @Column(name = "OBSERVATION_CONTROLE")
    private String observationControle;


}