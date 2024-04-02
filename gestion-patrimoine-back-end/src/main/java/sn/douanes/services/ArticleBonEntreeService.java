package sn.douanes.services;

import sn.douanes.entities.*;

import java.util.List;

public interface ArticleBonEntreeService {

    ArticleBonEntree saveArticleBonEntree(ArticleBonEntree a);
    ArticleBonEntree updateArticleBonEntree(ArticleBonEntree a);
    void deleteArticleBonEntree(ArticleBonEntree a);
    void deleteArticleBonEntreeById(Integer codeArticleBonEntree, String identifiantBonEntree);
    ArticleBonEntree getArticleBonEntreeById(Integer codeArticleBonEntree, String identifiantBonEntree);
    List<ArticleBonEntree> getAllArticleBonEntrees();

    ArticleBonEntree ajouterArticleBonEntree(Integer codeArticleBonEntree, String identifiantBonEntree, String libelleArticleBonEntree, LieuStockageVehicule codeLieuVH, Integer quantiteEntree, TypeObjet codeTypeObjet, Agent matriculeAgent);
}
