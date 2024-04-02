package sn.douanes.services;


import sn.douanes.entities.BonEntree;
import sn.douanes.entities.BordereauLivraison;

import java.sql.Date;
import java.util.List;

public interface BonEntreeService {

    BonEntree saveBonEntree(BonEntree b);
    BonEntree updateBonEntree(BonEntree b);
    void deleteBonEntree(BonEntree b);
    void deleteBonEntreeById(String id);
    BonEntree getBonEntreeById(String id);
    List<BonEntree> getAllBonEntrees();

    BonEntree ajouterBonEntree(String numeroBonEntree, Date dateBonEntree, BordereauLivraison identifiantBordereauLivraison,String libelleBonEntree, String observationBonEntree);


}
