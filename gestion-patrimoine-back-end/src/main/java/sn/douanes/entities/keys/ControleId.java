package sn.douanes.entities.keys;

import sn.douanes.entities.BonEntree;
import sn.douanes.entities.Vehicule;

import java.io.Serializable;
import java.sql.Timestamp;

public class ControleId implements Serializable {

    private String numeroSerie;
    private Timestamp dateControle;

    public ControleId() {
    }

    public ControleId(String numeroSerie, Timestamp dateControle) {
        this.numeroSerie = numeroSerie;
        this.dateControle = dateControle;
    }
}
