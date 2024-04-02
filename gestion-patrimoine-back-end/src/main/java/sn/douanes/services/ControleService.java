package sn.douanes.services;

import sn.douanes.entities.Controle;
import sn.douanes.entities.Vehicule;

import java.sql.Timestamp;
import java.util.List;

public interface ControleService {

    Controle saveControle(Controle c);
    Controle updateControle(Controle c);
    void deleteControleById(String numeroSerie, Timestamp dateControle);
    Controle getControle(String numeroSerie, Timestamp dateControle);
    List<Controle> getAllControles();


}
