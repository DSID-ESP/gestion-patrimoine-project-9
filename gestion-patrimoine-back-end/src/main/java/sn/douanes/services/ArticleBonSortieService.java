package sn.douanes.services;

import sn.douanes.entities.Agent;
import sn.douanes.entities.ArticleBonSortie;
import sn.douanes.entities.BonSortie;

import java.util.List;

public interface ArticleBonSortieService {

    ArticleBonSortie saveArticleBonSortie(ArticleBonSortie a);
    ArticleBonSortie updateArticleBonSortie(ArticleBonSortie a);
    void deleteArticleBonSortie(ArticleBonSortie a);
    void deleteArticleBonSortieById(Integer codeArticleBonSortie, String identifiantBonSortie);
    ArticleBonSortie getArticleBonSortieById(Integer codeArticleBonSortie, String identifiantBonSortie);
    List<ArticleBonSortie> getAllArticleBonSorties();

    ArticleBonSortie ajouterArticleBonSortie(String identifiantBonSortie, Integer codeArticleBonSortie, String libelleArticleBonSortie, Integer quantiteAccordee, Agent matriculeAgent);

}
