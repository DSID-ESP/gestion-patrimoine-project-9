package sn.douanes.services;

import sn.douanes.entities.Huile;

import java.util.List;

public interface HuileService {

    Huile saveHuile(Huile h);
    Huile updateHuile(Huile h);
    void deleteHuile(Huile h);
    void deleteHuileById(String id);
    Huile getHuileById(String id);
    List<Huile> getAllHuile();



}
