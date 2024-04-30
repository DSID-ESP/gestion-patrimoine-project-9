package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.Agent;
import sn.douanes.entities.ArticleBonPour;
import sn.douanes.entities.BonPour;
import sn.douanes.entities.TypeObjet;
import sn.douanes.entities.keys.ArticleBonPourId;
import sn.douanes.repositories.ArticleBonPourRepository;
import sn.douanes.services.ArticleBonPourService;

import java.util.List;


@Service
public class ArticleBonPourServiceImpl implements ArticleBonPourService {

    @Autowired
    ArticleBonPourRepository articleBonPourRepository;

    @Override
    public ArticleBonPour saveArticleBonPour(ArticleBonPour a) {
        return articleBonPourRepository.save(a);
    }

    @Override
    public ArticleBonPour updateArticleBonPour(ArticleBonPour a) {
        return articleBonPourRepository.save(a);
    }

    @Override
    public void deleteArticleBonPour(ArticleBonPour a) {
        articleBonPourRepository.delete(a);
    }

    @Override
    public void deleteArticleBonPourById(Integer codeArticleBonPour, String identifiantBonPour) {
        articleBonPourRepository.deleteById(new ArticleBonPourId(codeArticleBonPour, identifiantBonPour));
    }

    @Override
    public ArticleBonPour getArticleBonPourById(Integer codeArticleBonPour, String identifiantBonPour) {
        return articleBonPourRepository.findById(new ArticleBonPourId(codeArticleBonPour, identifiantBonPour)).isPresent() ? articleBonPourRepository.findById(new ArticleBonPourId(codeArticleBonPour, identifiantBonPour)).get() : null;
    }



    @Override
    public List<ArticleBonPour> getAllArticleBonPours() {
        return articleBonPourRepository.findAll();
    }


    @Override
    public List<ArticleBonPour> getAllArticleBonSortieById(String identifiantBonSortie) {
        return articleBonPourRepository.findAllByIdentifiantBonPour(identifiantBonSortie);
    }


    @Override
    public ArticleBonPour ajouterArticleBonPour(
            String identifiantBonPour,
            Integer codeArticleBonPour,
            String libelleArticleBonPour, 
            Integer quantiteDemandee, 
            TypeObjet codeTypeObjet,
            Agent matriculeAgent
    ) {

        ArticleBonPour articleBonPour = new ArticleBonPour();

        articleBonPour.setIdentifiantBonPour(identifiantBonPour);
        articleBonPour.setCodeArticleBonPour(codeArticleBonPour);
        articleBonPour.setLibelleArticleBonPour(libelleArticleBonPour);
        articleBonPour.setQuantiteDemandee(quantiteDemandee);
        articleBonPour.setCodeTypeObjet(codeTypeObjet);
        articleBonPour.setMatriculeAgent(matriculeAgent);

        return articleBonPourRepository.save(articleBonPour);
    }




}
