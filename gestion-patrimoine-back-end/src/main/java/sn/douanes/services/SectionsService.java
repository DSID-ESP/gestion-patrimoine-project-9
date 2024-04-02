package sn.douanes.services;

import sn.douanes.entities.Sections;

import java.util.List;

public interface SectionsService {

    Sections saveSections(Sections s);
    Sections updateSections(Sections s);
    void deleteSections(Sections s);
    void deleteSectionsById(String id);
    Sections getSectionsById(String id);
    List<Sections> getAllSectionss();


}
