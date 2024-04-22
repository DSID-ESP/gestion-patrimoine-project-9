package sn.douanes.services;

import sn.douanes.entities.Huile;
import sn.douanes.entities.Vidange;
import sn.douanes.entities.Vehicule;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.sql.Timestamp;
import java.util.List;

public interface VidangeService {

    Vidange saveVidange(Vidange v);
    Vidange updateVidange(Vidange v);
    void deleteVidange(Vidange v);
    void deleteVidangeById(String id);
    Vidange getVidangeById(String id);
    List<Vidange> getAllVidanges();

    Vidange ajouterVidange(String identifiantMaintenance, Huile identifiantHuile, int quantite);


}
