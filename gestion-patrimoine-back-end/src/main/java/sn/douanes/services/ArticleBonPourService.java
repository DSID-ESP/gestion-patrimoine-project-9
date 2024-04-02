package sn.douanes.services;

import sn.douanes.entities.Agent;
import sn.douanes.entities.ArticleBonPour;
import sn.douanes.entities.BonPour;
import sn.douanes.entities.TypeObjet;

import java.util.List;

public interface ArticleBonPourService {

    ArticleBonPour saveArticleBonPour(ArticleBonPour a);
    ArticleBonPour updateArticleBonPour(ArticleBonPour a);
    void deleteArticleBonPour(ArticleBonPour a);
    void deleteArticleBonPourById(Integer codeArticleBonPour, String identifiantBonPour);
    ArticleBonPour getArticleBonPourById(Integer codeArticleBonPour, String identifiantBonPour);
    List<ArticleBonPour> getAllArticleBonPours();

    ArticleBonPour ajouterArticleBonPour(String identifiantBonPour, Integer codeArticleBonPour, String libelleArticleBonPour, Integer quantiteDemandee, TypeObjet codeTypeObjet, Agent matriculeAgent);

}
