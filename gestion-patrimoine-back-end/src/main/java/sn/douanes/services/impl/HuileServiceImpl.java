package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.Huile;
import sn.douanes.repositories.HuileRepository;
import sn.douanes.services.HuileService;

import java.util.List;


@Service
public class HuileServiceImpl implements HuileService {

    @Autowired
    HuileRepository huileRepository;

    @Override
    public Huile saveHuile(Huile h) {
        return huileRepository.save(h);
    }

    @Override
    public Huile updateHuile(Huile h) {
        return huileRepository.save(h);
    }

    @Override
    public void deleteHuile(Huile h) {
        huileRepository.delete(h);
    }

    @Override
    public void deleteHuileById(String id) {
        huileRepository.deleteById(id);
    }

    @Override
    public Huile getHuileById(String id) {
        return huileRepository.findById(id).isPresent() ? huileRepository.findById(id).get() : null;
    }

    @Override
    public List<Huile> getAllHuile() {
        return huileRepository.findAll();
    }


//    @Override
//    public Huile ajouterHuile(
//            String codeHuile,
//            String libelleHuile
//    ) {
//
//        Huile Huile = new Huile();
//
//        Huile.setCodeHuile(codeHuile);
//        Huile.setLibelleHuile(libelleHuile);
//
//        return HuileRepository.save(Huile);
//    }


}
