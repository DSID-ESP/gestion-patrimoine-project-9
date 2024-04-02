package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.BonEntree;
import sn.douanes.entities.BordereauLivraison;
import sn.douanes.repositories.BonEntreeRepository;
import sn.douanes.services.BonEntreeService;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.format.DateTimeFormatter;
import java.util.List;


@Service
public class BonEntreeServiceImpl implements BonEntreeService {

    @Autowired
    BonEntreeRepository bonEntreeRepository;

    @Override
    public BonEntree saveBonEntree(BonEntree b) {
        return bonEntreeRepository.save(b);
    }


    @Override
    public BonEntree updateBonEntree(BonEntree b) {
        return bonEntreeRepository.save(b);
    }

    @Override
    public void deleteBonEntree(BonEntree b) {
        bonEntreeRepository.delete(b);
    }

    @Override
    public void deleteBonEntreeById(String id) {
        bonEntreeRepository.deleteById(id);
    }

    @Override
    public BonEntree getBonEntreeById(String id) {
        return bonEntreeRepository.findById(id).orElse(null);
    }

    @Override
    public List<BonEntree> getAllBonEntrees() {
        return bonEntreeRepository.findAll();
    }

    @Override
    public BonEntree ajouterBonEntree(
            String numeroBonEntree,
            Date dateBonEntree,
            BordereauLivraison identifiantBordereauLivraison,
            String libelleBonEntree,
            String observationBonEntree

    ) {

        BonEntree bonEntree = new BonEntree();
        bonEntree.setIdentifiantBE(genererIdentifiantBonEntree(identifiantBordereauLivraison.getCodeSection().getCodeSection(), genererDateEnregistrement(identifiantBordereauLivraison.getDateEnregistrement())));

        bonEntree.setNumeroBE(numeroBonEntree);
        bonEntree.setDateBonEntree(dateBonEntree);
        bonEntree.setIdentifiantBL(identifiantBordereauLivraison);
        bonEntree.setLibelleBonEntree(libelleBonEntree);
        bonEntree.setObservationBonEntree(observationBonEntree);



        return bonEntreeRepository.save(bonEntree);
    }


    private String genererIdentifiantBonEntree(String codeSection, String dateEnregistrement) {
        // Timestamp t = new Timestamp(System.currentTimeMillis())
        return "BE" + codeSection + dateEnregistrement;
    }


    private String genererDateEnregistrement(Timestamp dateEnregistrement) {
        // Timestamp t = new Timestamp(System.currentTimeMillis())
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS");
        return dateEnregistrement.toLocalDateTime().format(formatter);
    }

}
