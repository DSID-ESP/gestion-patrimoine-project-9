package sn.douanes.services.implSupprimer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.repositoriesSupprimer.MaterielsRepository;
import sn.douanes.servicesSupprimer.MaterielsService;

import java.util.List;


@Service
public class MaterielsServiceImpl implements MaterielsService {

    @Autowired
    MaterielsRepository materielsRepository;

    @Override
    public Materiels saveMateriels(Materiels m) {
        return materielsRepository.save(m);
    }

    @Override
    public Materiels updateMateriels(Materiels m) {
        return materielsRepository.save(m);
    }

    @Override
    public void deleteMateriels(Materiels m) {
        materielsRepository.delete(m);
    }

    @Override
    public void deleteMaterielsById(String id) {
        materielsRepository.deleteById(id);
    }

    @Override
    public Materiels getMateriels(String id) {
        return materielsRepository.findById(id).get();
    }

    @Override
    public List<Materiels> getAllMateriels() {
        return materielsRepository.findAll();
    }



}
