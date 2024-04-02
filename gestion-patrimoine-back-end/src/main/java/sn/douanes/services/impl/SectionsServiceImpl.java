package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.Sections;
import sn.douanes.repositories.SectionsRepository;
import sn.douanes.services.SectionsService;

import java.util.List;


@Service
public class SectionsServiceImpl implements SectionsService {

    @Autowired
    SectionsRepository sectionsRepository;

    @Override
    public Sections saveSections(Sections s) {
        return sectionsRepository.save(s);
    }

    @Override
    public Sections updateSections(Sections s) {
        return sectionsRepository.save(s);
    }

    @Override
    public void deleteSections(Sections s) {
        sectionsRepository.delete(s);
    }

    @Override
    public void deleteSectionsById(String id) {
        sectionsRepository.deleteById(id);
    }

    @Override
    public Sections getSectionsById(String id) {
        return sectionsRepository.findById(id).isPresent() ? sectionsRepository.findById(id).get() : null;
    }

    @Override
    public List<Sections> getAllSectionss() {
        return sectionsRepository.findAll();
    }


//    @Override
//    public Sections ajouterSections(
//            String codeSection,
//            String libelleSection
//    ) {
//
//        Sections sections = new Sections();
//
//        sections.setCodeSection(codeSection);
//        sections.setLibelleSection(libelleSection);
//
//        return sectionsRepository.save(sections);
//    }


}
