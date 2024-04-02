package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.*;
import sn.douanes.entities.keys.ArticleBonEntreeId;
import sn.douanes.repositories.ArticleBonEntreeRepository;
import sn.douanes.services.ArticleBonEntreeService;

import java.sql.Timestamp;
import java.util.List;


@Service
public class ArticleBonEntreeServiceImpl implements ArticleBonEntreeService {

    @Autowired
    ArticleBonEntreeRepository articleBonEntreeRepository;

    @Override
    public ArticleBonEntree saveArticleBonEntree(ArticleBonEntree a) {
        return articleBonEntreeRepository.save(a);
    }

    @Override
    public ArticleBonEntree updateArticleBonEntree(ArticleBonEntree a) {
        return articleBonEntreeRepository.save(a);
    }

    @Override
    public void deleteArticleBonEntree(ArticleBonEntree a) {
        articleBonEntreeRepository.delete(a);
    }

    @Override
    public void deleteArticleBonEntreeById(Integer codeArticleBonEntree, String identifiantBonEntree) {
        articleBonEntreeRepository.deleteById(new ArticleBonEntreeId(codeArticleBonEntree, identifiantBonEntree));
    }

    @Override
    public ArticleBonEntree getArticleBonEntreeById(Integer codeArticleBonEntree, String identifiantBonEntree) {
        return articleBonEntreeRepository.findById(new ArticleBonEntreeId(codeArticleBonEntree, identifiantBonEntree)).isPresent() ? articleBonEntreeRepository.findById(new ArticleBonEntreeId(codeArticleBonEntree, identifiantBonEntree)).get() : null;
    }



    @Override
    public List<ArticleBonEntree> getAllArticleBonEntrees() {
        return articleBonEntreeRepository.findAll();
    }


    @Override
    public ArticleBonEntree ajouterArticleBonEntree(
            Integer codeArticleBonEntree,
            String identifiantBonEntree,
            String libelleArticleBonEntree,
            LieuStockageVehicule codeLieuVH,
            Integer quantiteEntree,
            TypeObjet codeTypeObjet,
            Agent matriculeAgent
    ) {

        ArticleBonEntree articleBonEntree = new ArticleBonEntree();

        articleBonEntree.setDateEnregistrement(new Timestamp(System.currentTimeMillis()));

        articleBonEntree.setCodeArticleBonEntree(codeArticleBonEntree);
        articleBonEntree.setIdentifiantBE(identifiantBonEntree);
        articleBonEntree.setLibelleArticleBonEntree(libelleArticleBonEntree);
        articleBonEntree.setCodeLieuVH(codeLieuVH);
        articleBonEntree.setQuantiteEntree(quantiteEntree);
        articleBonEntree.setCodeTypeObjet(codeTypeObjet);
        articleBonEntree.setMatriculeAgent(matriculeAgent);


        return articleBonEntreeRepository.save(articleBonEntree);
    }



}
