package sn.douanes.services.implSupprimer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.repositoriesSupprimer.UniteHierarchiqueRepository;
import sn.douanes.servicesSupprimer.UniteHierarchiqueService;

import java.util.List;


@Service
public class UniteHierarchiqueServiceImpl implements UniteHierarchiqueService {

    @Autowired
    UniteHierarchiqueRepository uniteHierarchiqueRepository;

    @Override
    public UniteHierarchique saveUniteHierarchique(UniteHierarchique u) {
        return uniteHierarchiqueRepository.save(u);
    }

    @Override
    public UniteHierarchique updateUniteHierarchique(UniteHierarchique u) {
        return uniteHierarchiqueRepository.save(u);
    }

    @Override
    public void deleteUniteHierarchique(UniteHierarchique u) {
        uniteHierarchiqueRepository.delete(u);
    }

    @Override
    public void deleteUniteHierarchiqueById(String id) {
        uniteHierarchiqueRepository.deleteById(id);
    }

    @Override
    public UniteHierarchique getUniteHierarchique(String id) {
        return uniteHierarchiqueRepository.findById(id).get();
    }

    @Override
    public List<UniteHierarchique> getAllUniteHierarchiques() {
        return uniteHierarchiqueRepository.findAll();
    }



}
