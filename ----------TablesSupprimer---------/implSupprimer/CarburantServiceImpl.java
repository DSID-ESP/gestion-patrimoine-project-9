package sn.douanes.services.implSupprimer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.repositoriesSupprimer.CarburantRepository;
import sn.douanes.servicesSupprimer.CarburantService;

import java.util.List;


@Service
public class CarburantServiceImpl implements CarburantService {

    @Autowired
    CarburantRepository carburantRepository;

    @Override
    public Carburant saveCarburant(Carburant c) {
        return carburantRepository.save(c);
    }

    @Override
    public Carburant updateCarburant(Carburant c) {
        return carburantRepository.save(c);
    }

    @Override
    public void deleteCarburant(Carburant c) {
        carburantRepository.delete(c);
    }

    @Override
    public void deleteCarburantById(String id) {
        carburantRepository.deleteById(id);
    }

    @Override
    public Carburant getCarburant(String id) {
        return carburantRepository.findById(id).get();
    }

    @Override
    public List<Carburant> getAllCarburants() {
        return carburantRepository.findAll();
    }



}
