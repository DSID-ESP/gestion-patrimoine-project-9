package sn.douanes.services.implSupprimer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.repositoriesSupprimer.ArmesRepository;
import sn.douanes.servicesSupprimer.ArmesService;

import java.util.List;


@Service
public class ArmesServiceImpl implements ArmesService {

    @Autowired
    ArmesRepository armesRepository;

    @Override
    public Armes saveArmes(Armes a) {
        return armesRepository.save(a);
    }

    @Override
    public Armes updateArmes(Armes a) {
        return armesRepository.save(a);
    }

    @Override
    public void deleteArmes(Armes a) {
        armesRepository.delete(a);
    }

    @Override
    public void deleteArmesById(String id) {
        armesRepository.deleteById(id);
    }

    @Override
    public Armes getArmes(String id) {
        return armesRepository.findById(id).get();
    }

    @Override
    public List<Armes> getAllArmes() {
        return armesRepository.findAll();
    }



}
