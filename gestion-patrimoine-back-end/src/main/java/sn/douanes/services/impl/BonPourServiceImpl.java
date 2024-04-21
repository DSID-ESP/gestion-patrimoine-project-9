package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.Agent;
import sn.douanes.entities.BonPour;
import sn.douanes.entities.Sections;
import sn.douanes.entities.UniteDouaniere;
import sn.douanes.repositories.BonPourRepository;
import sn.douanes.services.BonPourService;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.format.DateTimeFormatter;
import java.util.List;


@Service
public class BonPourServiceImpl implements BonPourService {

    @Autowired
    BonPourRepository bonPourRepository;

    @Override
    public BonPour saveBonPour(BonPour b) {
        return bonPourRepository.save(b);
    }


    @Override
    public BonPour updateBonPour(BonPour b) {
        return bonPourRepository.save(b);
    }

    @Override
    public void deleteBonPour(BonPour b) {
        bonPourRepository.delete(b);
    }

    @Override
    public void deleteBonPourById(String id) {
        bonPourRepository.deleteById(id);
    }

    @Override
    public BonPour getBonPourById(String id) {
        return bonPourRepository.findById(id).isPresent() ? bonPourRepository.findById(id).get() : null;
    }

    @Override
    public List<BonPour> getAllBonPours() {
        return bonPourRepository.findAll();
    }

    @Override
    public BonPour ajouterBonPour(
            String identifiantBonPour,
            String descriptionBonPour,
            String etatBonPour,
            Sections codeSection,
            UniteDouaniere codeUniteDouaniere,
            Integer numeroCourrielOrigine,
            Date dateCourrielOrigine,
            String objectCourrielOrigine,
            Agent matriculeAgent,
            Integer numeroArriveBLM,
            Integer numeroArriveDLF,
            Integer numeroArriveSection,
            Date dateArriveBLM,
            Date dateArriveDLF,
            Date dateArriveSection,
            String observationBLM,
            String observationDLF,
            String observationSection

    ) {

        BonPour bonPour = new BonPour();
        bonPour.setDateEnregistrement(new Timestamp(System.currentTimeMillis()));

        if (identifiantBonPour == null) {
            bonPour.setIdentifiantBonPour(genererIdentifiantBonPour(codeSection.getCodeSection(), genererDateEnregistrement(bonPour.getDateEnregistrement())));
        } else {
            bonPour.setIdentifiantBonPour(identifiantBonPour);
        }

        bonPour.setDescriptionBonPour(descriptionBonPour);
        bonPour.setEtatBonPour(etatBonPour);
        bonPour.setCodeSection(codeSection);
        bonPour.setCodeUniteDouaniere(codeUniteDouaniere);
        bonPour.setNumeroCourrielOrigine(numeroCourrielOrigine);
        bonPour.setDateCourrielOrigine(dateCourrielOrigine);
        bonPour.setObjectCourrielOrigine(objectCourrielOrigine);
        bonPour.setMatriculeAgent(matriculeAgent);
        bonPour.setNumeroArriveBLM(numeroArriveBLM);
        bonPour.setNumeroArriveDLF(numeroArriveDLF);
        bonPour.setNumeroArriveSection(numeroArriveSection);
        bonPour.setDateArriveBLM(dateArriveBLM);
        bonPour.setDateArriveDLF(dateArriveDLF);
        bonPour.setDateArriveSection(dateArriveSection);
        bonPour.setObservationBLM(observationBLM);
        bonPour.setObservationDLF(observationDLF);
        bonPour.setObservationSection(observationSection);


        return bonPourRepository.save(bonPour);
    }


    private String genererIdentifiantBonPour(String codeSection, String dateEnregistrement) {
        // Timestamp t = new Timestamp(System.currentTimeMillis())
        return "BP" + codeSection + dateEnregistrement;
    }


    private String genererDateEnregistrement(Timestamp dateEnregistrement) {
        // Timestamp t = new Timestamp(System.currentTimeMillis())
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS");
        return dateEnregistrement.toLocalDateTime().format(formatter);
    }

}
