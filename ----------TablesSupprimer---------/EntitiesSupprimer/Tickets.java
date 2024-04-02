package sn.douanes.EntitiesSupprimer;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;


@Entity
//@Table(name = "tickets")
public class Tickets {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    // @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "identifiant_tickets", nullable = false, updatable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long id;



}