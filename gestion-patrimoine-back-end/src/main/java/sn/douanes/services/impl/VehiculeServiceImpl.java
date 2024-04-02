package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.*;
import sn.douanes.repositories.VehiculeRepository;
import sn.douanes.services.VehiculeService;

import java.sql.Date;
import java.util.List;
import java.util.Set;


@Service
public class VehiculeServiceImpl implements VehiculeService {

    @Autowired
    VehiculeRepository vehiculeRepository;

    @Override
    public Vehicule saveVehicule(Vehicule v) {
        return vehiculeRepository.save(v);
    }

    @Override
    public Vehicule updateVehicule(Vehicule v) {
        return vehiculeRepository.save(v);
    }

    @Override
    public void deleteVehicule(Vehicule v) {
        vehiculeRepository.delete(v);
    }

    @Override
    public void deleteVehiculeById(String id) {
        vehiculeRepository.deleteById(id);
    }

    @Override
    public Vehicule getVehiculeById(String id) {
        return vehiculeRepository.findById(id).isPresent() ? vehiculeRepository.findById(id).get() : null;
    }

    @Override
    public List<Vehicule> getAllVehicules() {
        return vehiculeRepository.findAll();
    }


    @Override
    public Vehicule ajouterVehicule(
            String numeroSerie,
            String numeroImmatriculation,
            ArticleBonEntree codeArticleBonEntree,
            MarqueVehicule codeMarque,
            TypeEnergie codeTypeEnergie,
            String numeroCarteGrise,
            TypeVehicule codeTypeVehicule,
            String modele,
            Pays codePays,
            Date dateMiseEnCirculation
    ) {

        Vehicule vehicule = new Vehicule();

        vehicule.setNumeroSerie(numeroSerie);
        vehicule.setNumeroImmatriculation(numeroImmatriculation);
        vehicule.setCodeArticleBonEntree(codeArticleBonEntree);
        vehicule.setCodeMarque(codeMarque);
        vehicule.setCodeTypeEnergie(codeTypeEnergie);
        vehicule.setNumeroCarteGrise(numeroCarteGrise);
        vehicule.setCodeTypeVehicule(codeTypeVehicule);
        vehicule.setModele(modele);
        vehicule.setCodePays(codePays);
        vehicule.setDateMiseEnCirculation(dateMiseEnCirculation);

        vehiculeRepository.save(vehicule);
        return vehicule;
    }


}
