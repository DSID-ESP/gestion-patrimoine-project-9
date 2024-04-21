package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.Agent;
import sn.douanes.entities.ArticleBonSortie;
import sn.douanes.entities.BonSortie;
import sn.douanes.entities.keys.ArticleBonSortieId;
import sn.douanes.repositories.ArticleBonSortieRepository;
import sn.douanes.services.ArticleBonSortieService;

import java.sql.Date;
import java.util.List;


@Service
public class ArticleBonSortieServiceImpl implements ArticleBonSortieService {

    @Autowired
    ArticleBonSortieRepository articleBonSortieRepository;

    @Override
    public ArticleBonSortie saveArticleBonSortie(ArticleBonSortie a) {
        return articleBonSortieRepository.save(a);
    }

    @Override
    public ArticleBonSortie updateArticleBonSortie(ArticleBonSortie a) {
        return articleBonSortieRepository.save(a);
    }

    @Override
    public void deleteArticleBonSortie(ArticleBonSortie a) {
        articleBonSortieRepository.delete(a);
    }

    @Override
    public void deleteArticleBonSortieById(Integer codeArticleBonSortie, String identifiantBonSortie) {
        articleBonSortieRepository.deleteById(new ArticleBonSortieId(codeArticleBonSortie, identifiantBonSortie));
    }

    @Override
    public ArticleBonSortie getArticleBonSortieById(Integer codeArticleBonSortie, String identifiantBonSortie) {
        return articleBonSortieRepository.findById(new ArticleBonSortieId(codeArticleBonSortie, identifiantBonSortie)).isPresent() ? articleBonSortieRepository.findById(new ArticleBonSortieId(codeArticleBonSortie, identifiantBonSortie)).get() : null;
    }


    @Override
    public List<ArticleBonSortie> getAllArticleBonSorties() {
        return articleBonSortieRepository.findAll();
    }


    @Override
    public ArticleBonSortie ajouterArticleBonSortie(
            String identifiantBonSortie,
            Integer codeArticleBonSortie,
            String libelleArticleBonSortie,
            Integer quantiteAccordeeSection,
            Integer quantiteAccordeeBLM,
            Integer quantiteAccordeeDLF,
            Integer quantiteAccordeeDefinitive,
            Agent matriculeAgent
    ) {

        ArticleBonSortie articleBonSortie = new ArticleBonSortie();

        articleBonSortie.setIdentifiantBonSortie(identifiantBonSortie);
        articleBonSortie.setCodeArticleBonSortie(codeArticleBonSortie);
        articleBonSortie.setLibelleArticleBonSortie(libelleArticleBonSortie);
        articleBonSortie.setQuantiteAccordeeSection(quantiteAccordeeSection);
        articleBonSortie.setQuantiteAccordeeBLM(quantiteAccordeeBLM);
        articleBonSortie.setQuantiteAccordeeDLF(quantiteAccordeeDLF);
        articleBonSortie.setQuantiteAccordeeDefinitive(quantiteAccordeeDefinitive);
        articleBonSortie.setDateArticleBonSortie(new Date(System.currentTimeMillis()));

        articleBonSortie.setMatriculeAgent(matriculeAgent);

        return articleBonSortieRepository.save(articleBonSortie);
    }




}
