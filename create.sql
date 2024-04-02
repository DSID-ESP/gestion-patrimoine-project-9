-- Adminer 4.8.1 PostgreSQL 16.2 (Debian 16.2-1.pgdg120+2) dump

CREATE TABLE "public"."agent" (
    "matricule_agent" character varying(7) NOT NULL,
    "code_agent" character varying(5),
    "email_agent" character varying(100),
    "nom_agent" character varying(100),
    "numero_telephone_agent" integer,
    "prenom_agent" character varying(255),
    "code_section" character varying(3),
    "code_unite_douaniere" character varying(3),
    CONSTRAINT "agent_pkey" PRIMARY KEY ("matricule_agent"),
    CONSTRAINT "uk_5d65n8trvjxmh3b959pe81gdo" UNIQUE ("code_agent")
);


CREATE TABLE "public"."article_bon_entree" (
    "code_article_bon_entree" integer NOT NULL,
    "identifiant_b_e" character varying(255) NOT NULL,
    "date_enregistrement" timestamp,
    "libelle_article_bon_entree" character varying(255),
    "quantite_entree" integer,
    "code_lieu_vh" character varying(3),
    "code_type_objet" character varying(5),
    "matricule_agent" character varying(7),
    CONSTRAINT "article_bon_entree_pkey" PRIMARY KEY ("code_article_bon_entree", "identifiant_b_e")
);


CREATE TABLE "public"."article_bon_pour" (
    "code_article_bon_pour" integer NOT NULL,
    "identifiant_bon_pour" character varying(255) NOT NULL,
    "libelle_article_bon_pour" character varying(100),
    "quantite_demandee" integer,
    "code_type_objet" character varying(5),
    "matricule_agent" character varying(7),
    CONSTRAINT "article_bon_pour_pkey" PRIMARY KEY ("code_article_bon_pour", "identifiant_bon_pour")
);


CREATE TABLE "public"."article_bon_sortie" (
    "code_article_bon_sortie" integer NOT NULL,
    "identifiant_bon_sortie" character varying(255) NOT NULL,
    "libelle_article_bon_sortie" character varying(100),
    "date_article_bon_sortie" date,
    "quantite_accordee" integer,
    "matricule_agent" character varying(7),
    CONSTRAINT "article_bon_sortie_pkey" PRIMARY KEY ("code_article_bon_sortie", "identifiant_bon_sortie")
);


CREATE TABLE "public"."authorities" (
    "code_authority" integer NOT NULL,
    "name_authorities" character varying(100),
    CONSTRAINT "authorities_pkey" PRIMARY KEY ("code_authority")
);


CREATE TABLE "public"."bon_entree" (
    "identifiant_b_e" character varying(25) NOT NULL,
    "date_bon_entree" date,
    "libelle_bon_entree" character varying(255),
    "numero_b_e" character varying(255),
    "observation_bon_entree" character varying(255),
    "identifiant_b_l" character varying(25),
    CONSTRAINT "bon_entree_pkey" PRIMARY KEY ("identifiant_b_e"),
    CONSTRAINT "uk_snywq6o1xldkognlpmn20x0tq" UNIQUE ("numero_b_e")
);


CREATE TABLE "public"."bon_pour" (
    "identifiant_bon_pour" character varying(25) NOT NULL,
    "date_arrive_b_l_m" date,
    "date_arrive_d_l_f" date,
    "date_arrive_section" date,
    "date_courriel_origine" date,
    "date_enregistrement" timestamp,
    "description_bon_pour" character varying(255),
    "etat_bon_pour" character varying(10),
    "numero_arrive_b_l_m" integer,
    "numero_arrive_d_l_f" integer,
    "numero_arrive_section" integer,
    "numero_courriel_origine" integer,
    "object_courriel_origine" character varying(255),
    "observation_b_l_m" character varying(255),
    "observation_d_l_f" character varying(255),
    "observation_section" character varying(255),
    "code_section" character varying(3),
    "code_unite_douaniere" character varying(3),
    "matricule_agent" character varying(7),
    CONSTRAINT "bon_pour_pkey" PRIMARY KEY ("identifiant_bon_pour")
);


CREATE TABLE "public"."bon_sortie" (
    "identifiant_bon_sorie" character varying(255) NOT NULL,
    "date_bon_sortie" date,
    "description_bon_sortie" character varying(255),
    "numero_bon_sortie" character varying(255),
    "identifiant_bon_pour" character varying(25),
    "matricule_agent" character varying(7),
    CONSTRAINT "bon_sortie_pkey" PRIMARY KEY ("identifiant_bon_sorie")
);


CREATE TABLE "public"."bordereau_livraison" (
    "identifiant_b_l" character varying(25) NOT NULL,
    "conformite_b_l" character varying(3),
    "date_b_l" date,
    "date_enregistrement" timestamp,
    "description_b_l" character varying(512),
    "lieu_de_livraison" character varying(255),
    "numero_b_l" character varying(100),
    "representant_prestataire" character varying(255),
    "code_section" character varying(3),
    "matricule_agent" character varying(7),
    "ninea" character varying(20),
    CONSTRAINT "bordereau_livraison_pkey" PRIMARY KEY ("identifiant_b_l"),
    CONSTRAINT "uk_n83owkmrvlxthq773n0juim69" UNIQUE ("numero_b_l")
);


CREATE TABLE "public"."controle" (
    "date_controle" timestamp NOT NULL,
    "numero_serie" character varying(255) NOT NULL,
    "observation_controle" character varying(255),
    CONSTRAINT "controle_pkey" PRIMARY KEY ("date_controle", "numero_serie")
);


CREATE TABLE "public"."dotation_vehicule" (
    "identifiant_d_v" character varying(25) NOT NULL,
    "date_dotation" date,
    "code_article_bon_sortie" integer,
    "identifiant_bon_sortie" character varying(255),
    "matricule_agent" character varying(7),
    "numero_serie" character varying(30),
    CONSTRAINT "dotation_vehicule_pkey" PRIMARY KEY ("identifiant_d_v")
);


CREATE TABLE "public"."fonctions" (
    "code_fonction" character varying(25) NOT NULL,
    "libelle_fonction" character varying(100),
    CONSTRAINT "fonctions_pkey" PRIMARY KEY ("code_fonction")
);


CREATE TABLE "public"."lieu_stockage_vehicule" (
    "code_lieu_vh" character varying(3) NOT NULL,
    "libellle_lieu_vh" character varying(100),
    "nombre_limite_stockage_vh" integer,
    CONSTRAINT "lieu_stockage_vehicule_pkey" PRIMARY KEY ("code_lieu_vh")
);


CREATE TABLE "public"."marque_arme" (
    "code_marque_arme" character varying(10) NOT NULL,
    "libelle_marque_arme" character varying(100),
    CONSTRAINT "marque_arme_pkey" PRIMARY KEY ("code_marque_arme")
);


CREATE TABLE "public"."marque_vehicule" (
    "code_marque_vh" character varying(25) NOT NULL,
    "libelle_marque_vh" character varying(100),
    CONSTRAINT "marque_vehicule_pkey" PRIMARY KEY ("code_marque_vh")
);


CREATE TABLE "public"."pays" (
    "code_pays" character varying(3) NOT NULL,
    "libelle_pays" character varying(100),
    CONSTRAINT "pays_pkey" PRIMARY KEY ("code_pays")
);


CREATE TABLE "public"."prestataires" (
    "ninea" character varying(20) NOT NULL,
    "adresse" character varying(512),
    "adresse_email" character varying(100),
    "numero_telephone" integer,
    "raison_sociale" character varying(512),
    CONSTRAINT "prestataires_pkey" PRIMARY KEY ("ninea")
);


CREATE TABLE "public"."prestataires_secteur" (
    "ninea" character varying(20) NOT NULL,
    "code_secteur_activite" character varying(10) NOT NULL,
    CONSTRAINT "prestataires_secteur_pkey" PRIMARY KEY ("ninea", "code_secteur_activite")
);


CREATE TABLE "public"."secteur_activite" (
    "code_secteur_activite" character varying(10) NOT NULL,
    "libelle_secteur_activite" character varying(255),
    CONSTRAINT "secteur_activite_pkey" PRIMARY KEY ("code_secteur_activite")
);


CREATE TABLE "public"."sections" (
    "code_section" character varying(3) NOT NULL,
    "libelle_section" character varying(100),
    "code_unite_douaniere" character varying(3),
    CONSTRAINT "sections_pkey" PRIMARY KEY ("code_section")
);


CREATE TABLE "public"."type_arme" (
    "code_type_arme" character varying(25) NOT NULL,
    "libelle_type_arme" character varying(255),
    CONSTRAINT "type_arme_pkey" PRIMARY KEY ("code_type_arme")
);


CREATE TABLE "public"."type_energie" (
    "code_type_energie" character varying(25) NOT NULL,
    "libelle_type_energie" character varying(100),
    CONSTRAINT "type_energie_pkey" PRIMARY KEY ("code_type_energie")
);


CREATE TABLE "public"."type_objet" (
    "code_type_objet" character varying(5) NOT NULL,
    "libelle_type_objet" character varying(100),
    "code_section" character varying(3),
    CONSTRAINT "type_objet_pkey" PRIMARY KEY ("code_type_objet")
);


CREATE TABLE "public"."type_unite_douaniere" (
    "code_type_unite_douaniere" character varying(5) NOT NULL,
    "libelle_type_unite_douaniere" character varying(100),
    CONSTRAINT "type_unite_douaniere_pkey" PRIMARY KEY ("code_type_unite_douaniere")
);


CREATE TABLE "public"."type_vehicule" (
    "code_type_vehicule" character varying(20) NOT NULL,
    "libelle_type_vehicule" character varying(20),
    CONSTRAINT "type_vehicule_pkey" PRIMARY KEY ("code_type_vehicule")
);


CREATE TABLE "public"."unite_douaniere" (
    "code_unite_douaniere" character varying(3) NOT NULL,
    "effectif_unite_douaniere" integer,
    "nom_unite_douaniere" character varying(255),
    "nombre_arme" integer,
    "nombre_automobile" integer,
    "nombre_materiel" integer,
    "code_type_unite_douaniere" character varying(5),
    CONSTRAINT "unite_douaniere_pkey" PRIMARY KEY ("code_unite_douaniere")
);


CREATE TABLE "public"."utilisateur" (
    "utilisateur_id" integer NOT NULL,
    "is_active" boolean NOT NULL,
    "is_not_locked" boolean NOT NULL,
    "join_date" timestamp,
    "last_login_date" timestamp,
    "last_login_date_display" timestamp,
    "mot_de_passe" character varying(255),
    "user_name" character varying(7),
    "code_fonction" character varying(25),
    "matricule_agent" character varying(7),
    CONSTRAINT "utilisateur_pkey" PRIMARY KEY ("utilisateur_id")
);


CREATE TABLE "public"."utilisateur_authority" (
    "code_authority" integer NOT NULL,
    "utilisateur_id" integer NOT NULL,
    CONSTRAINT "utilisateur_authority_pkey" PRIMARY KEY ("utilisateur_id", "code_authority")
);


CREATE TABLE "public"."vehicule" (
    "numero_serie" character varying(30) NOT NULL,
    "date_mise_en_circulation" date,
    "libelle_etat_vehicule" character varying(10),
    "modele" character varying(50),
    "numero_carte_grise" character varying(30),
    "numero_immatriculation" character varying(20),
    "code_article_bon_entree" integer,
    "identifiant_b_e" character varying(255),
    "code_marque" character varying(25),
    "code_pays" character varying(3),
    "code_type_energie" character varying(25),
    "code_type_vehicule" character varying(20),
    CONSTRAINT "vehicule_pkey" PRIMARY KEY ("numero_serie")
);


CREATE TABLE "public"."maintenance" (
    "identifiant_maintenance" character varying(25) NOT NULL, -- exemple : MSG202311121243214 (SG+heure en timestamp)
    "numero_serie" character varying(30),
    "date_debut_maintenance" timestamp,
    "date_fin_maintenance" timestamp,
    "type_maintenance" character varying(15),
    "motif_reparation" character varying(15),
    "rapport_incident" character varying(512),
    CONSTRAINT "maintenance_pkey" PRIMARY KEY ("identifiant_maintenance")
);

CREATE TABLE "public"."controle" (
    "identifiant_maintenance" character varying(25) NOT NULL, -- exemple : MSG202311121243214 (SG+heure en timestamp)
    "date_controle" date,
    "observation_controle" character varying(100),
    CONSTRAINT "maintenance_pkey" PRIMARY KEY ("identifiant_maintenance")
);


CREATE TABLE "public"."changement_piece" (
    "identifiant_maintenance" character varying(25) NOT NULL, -- exemple : MSG202311121243214 (SG+heure en timestamp)
    "date_changement_piece" DATE,
    "nombre_pieces_rechangees" integer,
    "reference_pieces" character varying(512),
    "observation_changement" character varying(512),
    CONSTRAINT "changement_piece_pkey" PRIMARY KEY ("identifiant_maintenance")
);

CREATE TABLE "public"."vidange" (
    "identifiant_maintenance" character varying(25) NOT NULL, -- exemple : MSG202311121243214 (SG+heure en timestamp)
    "date_vidange" timestamp,
    "libelle_huile" character varying(512),
    "quantite_mise_vehicule" integer,
    CONSTRAINT "vidange_pkey" PRIMARY KEY ("identifiant_maintenance")
);


ALTER TABLE ONLY "public"."agent" ADD CONSTRAINT "fk6uo4h7rhn0bs7dr3h81rtj55y" FOREIGN KEY (code_section) REFERENCES sections(code_section) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."agent" ADD CONSTRAINT "fklsg4dt0dg2au4hrd52jcjee5q" FOREIGN KEY (code_unite_douaniere) REFERENCES unite_douaniere(code_unite_douaniere) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."article_bon_entree" ADD CONSTRAINT "fk1m4mo43nh47custpl6f9sm30h" FOREIGN KEY (matricule_agent) REFERENCES agent(matricule_agent) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."article_bon_entree" ADD CONSTRAINT "fk3jotbylcitc58mk3vftxp3bki" FOREIGN KEY (code_lieu_vh) REFERENCES lieu_stockage_vehicule(code_lieu_vh) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."article_bon_entree" ADD CONSTRAINT "fksajtr4e61rjdg24jijhnfje4b" FOREIGN KEY (code_type_objet) REFERENCES type_objet(code_type_objet) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."article_bon_pour" ADD CONSTRAINT "fkjlpviq6xkvqa50y5kt5sunik4" FOREIGN KEY (matricule_agent) REFERENCES agent(matricule_agent) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."article_bon_pour" ADD CONSTRAINT "fkooy7avgbu2t1yhe05wbregrod" FOREIGN KEY (code_type_objet) REFERENCES type_objet(code_type_objet) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."article_bon_sortie" ADD CONSTRAINT "fkdu5p9ui862o7e13x2du78d7vl" FOREIGN KEY (matricule_agent) REFERENCES agent(matricule_agent) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."bon_entree" ADD CONSTRAINT "fkg6gtmvaum4xew2c7xbqjq9ed8" FOREIGN KEY (identifiant_b_l) REFERENCES bordereau_livraison(identifiant_b_l) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."bon_pour" ADD CONSTRAINT "fk1q1qo11ebff6qmgodxcu4o9st" FOREIGN KEY (code_unite_douaniere) REFERENCES unite_douaniere(code_unite_douaniere) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."bon_pour" ADD CONSTRAINT "fk43wwfgfqivcje18oyvmwghaxq" FOREIGN KEY (code_section) REFERENCES sections(code_section) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."bon_pour" ADD CONSTRAINT "fkkh6pqubewx9nlafc4o0u15elj" FOREIGN KEY (matricule_agent) REFERENCES agent(matricule_agent) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."bon_sortie" ADD CONSTRAINT "fk2gww0h1f2cd7cdk58ew10wql0" FOREIGN KEY (matricule_agent) REFERENCES agent(matricule_agent) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."bon_sortie" ADD CONSTRAINT "fka1yvddyp3obk77a1fqouvbxdy" FOREIGN KEY (identifiant_bon_pour) REFERENCES bon_pour(identifiant_bon_pour) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."bordereau_livraison" ADD CONSTRAINT "fk9nfrqjn6o2cn6f2s0jebjy4rd" FOREIGN KEY (matricule_agent) REFERENCES agent(matricule_agent) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."bordereau_livraison" ADD CONSTRAINT "fkllyex0gchkfeo1kny1wfiat2i" FOREIGN KEY (ninea) REFERENCES prestataires(ninea) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."bordereau_livraison" ADD CONSTRAINT "fkmkyijg5tdm42o6emet2cj3cls" FOREIGN KEY (code_section) REFERENCES sections(code_section) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."dotation_vehicule" ADD CONSTRAINT "fk369d727jgd997p8whn8yqv2ds" FOREIGN KEY (code_article_bon_sortie, identifiant_bon_sortie) REFERENCES article_bon_sortie(code_article_bon_sortie, identifiant_bon_sortie) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."dotation_vehicule" ADD CONSTRAINT "fk78p66iohicuby5m74tvsmiskb" FOREIGN KEY (matricule_agent) REFERENCES agent(matricule_agent) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."dotation_vehicule" ADD CONSTRAINT "fkg4b8pqxcjanpcurf0avf3hft4" FOREIGN KEY (numero_serie) REFERENCES vehicule(numero_serie) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."prestataires_secteur" ADD CONSTRAINT "fk30lvtrpr5gkiw3cv8pxixfm0q" FOREIGN KEY (code_secteur_activite) REFERENCES secteur_activite(code_secteur_activite) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."prestataires_secteur" ADD CONSTRAINT "fk7sh4gxdaa0d8r2623aii9h3cr" FOREIGN KEY (ninea) REFERENCES prestataires(ninea) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."sections" ADD CONSTRAINT "fkq7lgsklxbp20ku1stghg6iyqi" FOREIGN KEY (code_unite_douaniere) REFERENCES unite_douaniere(code_unite_douaniere) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."type_objet" ADD CONSTRAINT "fklo9awrorjgkp48pvwpfk1tkby" FOREIGN KEY (code_section) REFERENCES sections(code_section) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."unite_douaniere" ADD CONSTRAINT "fkrmqo6iuo3mtc5ewy4qwxehun5" FOREIGN KEY (code_type_unite_douaniere) REFERENCES type_unite_douaniere(code_type_unite_douaniere) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."utilisateur" ADD CONSTRAINT "fk3xm5o6ux34ujo3c6vk2vd85tv" FOREIGN KEY (matricule_agent) REFERENCES agent(matricule_agent) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."utilisateur" ADD CONSTRAINT "fkjwnvn45hmnxqa621aremhthe8" FOREIGN KEY (code_fonction) REFERENCES fonctions(code_fonction) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."utilisateur_authority" ADD CONSTRAINT "fkfks49eqjrvm6sknerbq5xdx51" FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(utilisateur_id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."utilisateur_authority" ADD CONSTRAINT "fkm4wyq2kw01dqr7y1ebuxd1c2h" FOREIGN KEY (code_authority) REFERENCES authorities(code_authority) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."vehicule" ADD CONSTRAINT "fk8qtadox10ekwuivfogcmg5a03" FOREIGN KEY (code_marque) REFERENCES marque_vehicule(code_marque_vh) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."vehicule" ADD CONSTRAINT "fk9ew0gb55oe0nuci8wkmvf3dma" FOREIGN KEY (code_article_bon_entree, identifiant_b_e) REFERENCES article_bon_entree(code_article_bon_entree, identifiant_b_e) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."vehicule" ADD CONSTRAINT "fkipaic0o0eppetwttr3i51t542" FOREIGN KEY (code_type_energie) REFERENCES type_energie(code_type_energie) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."vehicule" ADD CONSTRAINT "fkit3tsr2xvg9lsx8a2wpbl9pj" FOREIGN KEY (code_type_vehicule) REFERENCES type_vehicule(code_type_vehicule) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."vehicule" ADD CONSTRAINT "fkkyvs90njn6tl5nwgpbi867iej" FOREIGN KEY (code_pays) REFERENCES pays(code_pays) NOT DEFERRABLE;

-- 2024-03-21 15:54:29.335097+00