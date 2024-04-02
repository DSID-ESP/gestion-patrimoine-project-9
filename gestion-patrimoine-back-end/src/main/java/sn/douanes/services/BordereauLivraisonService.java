package sn.douanes.services;


import sn.douanes.entities.Agent;
import sn.douanes.entities.BordereauLivraison;
import sn.douanes.entities.Prestataires;
import sn.douanes.entities.Sections;

import java.sql.Date;
import java.util.List;

public interface BordereauLivraisonService {

    BordereauLivraison saveBordereauLivraison(BordereauLivraison b);
    BordereauLivraison updateBordereauLivraison(BordereauLivraison b);
    void deleteBordereauLivraison(BordereauLivraison b);
    void deleteBordereauLivraisonById(String id);
    BordereauLivraison getBordereauLivraisonById(String id);
    List<BordereauLivraison> getAllBordereauLivraisons();

    BordereauLivraison ajouterBordereauLivraison(String numeroBordereauLivraison,Date dateBordereauLivraison, String descriptionBordereauLivraison, String lieuDeLivraison, String representantPrestataire,Sections codeSection, String conformiteBordereauLivraison,Agent matriculeAgent, Prestataires ninea);

    List<BordereauLivraison> getAllBordereauByNinea(Prestataires ninea);
}
