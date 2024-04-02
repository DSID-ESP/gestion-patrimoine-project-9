package sn.douanes.services.implSupprimer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.repositoriesSupprimer.FournisseursRepository;
import sn.douanes.servicesSupprimer.FournisseursService;

import java.util.List;


@Service
public class FournisseursServiceImpl implements FournisseursService {

    @Autowired
    FournisseursRepository fournisseursRepository;

    @Override
    public Fournisseurs saveFournisseurs(Fournisseurs f) {
        return fournisseursRepository.save(f);
    }

    @Override
    public Fournisseurs updateFournisseurs(Fournisseurs f) {
        return fournisseursRepository.save(f);
    }

    @Override
    public void deleteFournisseurs(Fournisseurs f) {
        fournisseursRepository.delete(f);
    }

    @Override
    public void deleteFournisseursById(String id) {
        fournisseursRepository.deleteById(id);
    }

    @Override
    public Fournisseurs getFournisseurs(String id) {
        return fournisseursRepository.findById(id).get();
    }

    @Override
    public List<Fournisseurs> getAllFournisseurs() {
        return fournisseursRepository.findAll();
    }



}
