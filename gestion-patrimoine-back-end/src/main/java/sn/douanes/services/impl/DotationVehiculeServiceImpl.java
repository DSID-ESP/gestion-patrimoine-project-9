package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.Agent;
import sn.douanes.entities.ArticleBonSortie;
import sn.douanes.entities.DotationVehicule;
import sn.douanes.entities.Vehicule;
import sn.douanes.repositories.DotationVehiculeRepository;
import sn.douanes.services.DotationVehiculeService;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;


@Service
public class DotationVehiculeServiceImpl implements DotationVehiculeService {

    @Autowired
    DotationVehiculeRepository dotationVehiculeRepository;

    @Override
    public DotationVehicule saveDotationVehicule(DotationVehicule d) {
        return dotationVehiculeRepository.save(d);
    }

    @Override
    public DotationVehicule updateDotationVehicule(DotationVehicule d) {
        return dotationVehiculeRepository.save(d);
    }

    @Override
    public void deleteDotationVehicule(DotationVehicule d) {
        dotationVehiculeRepository.delete(d);
    }

    @Override
    public void deleteDotationVehiculeById(String id) {
        dotationVehiculeRepository.deleteById(id);
    }

    @Override
    public DotationVehicule getDotationVehiculeById(String id) {
        return dotationVehiculeRepository.findById(id).isPresent() ? dotationVehiculeRepository.findById(id).get() : null;
    }

    @Override
    public DotationVehicule getDotationVehiculeByNumeroSerie(Vehicule numeroSerie) {
        return dotationVehiculeRepository.findByNumeroSerie(numeroSerie);
    }



    @Override
    public List<DotationVehicule> getAllDotationVehicules() {
        return dotationVehiculeRepository.findAll();
    }


    @Override
    public DotationVehicule ajouterDotationVehicule(
            String identifiantDV,
            Vehicule numeroSerie,
            Date dateDotation,
            Agent matriculeAgent,
            ArticleBonSortie codeArticleBonSortie
    ) {

        DotationVehicule dotationVehicule = new DotationVehicule();


        dotationVehicule.setIdentifiantDV(genererIdentifiantDV(matriculeAgent.getCodeSection().getCodeSection(), genererDateEnregistrement(new Timestamp(System.currentTimeMillis()))));
        dotationVehicule.setNumeroSerie(numeroSerie);
        dotationVehicule.setDateDotation(new Date(System.currentTimeMillis()));
        dotationVehicule.setMatriculeAgent(matriculeAgent);
        dotationVehicule.setCodeArticleBonSortie(codeArticleBonSortie);

        return dotationVehiculeRepository.save(dotationVehicule);
    }

    private String genererIdentifiantDV(String codeSection, String dateDotation) {
        // Timestamp t = new Timestamp(System.currentTimeMillis())
        return "DV" + codeSection + dateDotation;
    }


    private String genererDateEnregistrement(Timestamp dateEnregistrement) {
        // Timestamp t = new Timestamp(System.currentTimeMillis())
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS");
        return dateEnregistrement.toLocalDateTime().format(formatter);
    }



}
