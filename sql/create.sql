DROP TABLE IF EXISTS artifact_sets CASCADE;
CREATE TABLE IF NOT EXISTS artifact_sets (
  set_name VARCHAR(50) NOT NULL,
  set_imageSource VARCHAR(200) NOT NULL,
  set_id SERIAL PRIMARY KEY
);

DROP TABLE IF EXISTS set_pieces CASCADE;
CREATE TABLE IF NOT EXISTS set_pieces (
  piece_name VARCHAR(50) NOT NULL,
  piece_id SERIAL PRIMARY KEY
);

DROP TABLE IF EXISTS stats_list CASCADE;
CREATE TABLE IF NOT EXISTS stats_list (
  stat_name VARCHAR(50) NOT NULL,
  stat_mainstat_value FLOAT,
  stat_substat_average FLOAT,
  stat_id SERIAL PRIMARY KEY
);

DROP TABLE IF EXISTS user_artifacts CASCADE;
CREATE TABLE IF NOT EXISTS user_artifacts (
  set_name VARCHAR(50) NOT NULL,
  set_piece VARCHAR(10) NOT NULL,
  mainstat_type VARCHAR(20) NOT NULL,
  substat1_type VARCHAR(20) NOT NULL,
  substat2_type VARCHAR(20) NOT NULL,
  substat3_type VARCHAR(20) NOT NULL,
  substat4_type VARCHAR(20) NOT NULL,
  mainstat_value FLOAT NOT NULL,
  substat1_value FLOAT NOT NULL,
  substat2_value FLOAT NOT NULL,
  substat3_value FLOAT NOT NULL,
  substat4_value FLOAT NOT NULL,
  artifact_id SERIAL PRIMARY KEY
);

/*DROP TABLE IF EXISTS artifact_storage CASCADE;
CREATE TABLE IF NOT EXISTS artifact_storage (
  artifacts INT[]
);
*/

/*Insertions*/

INSERT INTO artifact_sets
(set_name, set_imageSource)
VALUES
('Gladiator''s Finale', '../assets/gladiators_finale.png'),
('Wanderer''s Troupe', '../assets/wanderers_troupe.png'),
('Thundersoother', '../assets/thundersoother.png'),
('Thundering Fury', '../assets/thundering_fury.png'),
('Maiden Beloved', '../assets/maiden_beloved.png'),
('Viridescent Venerer', '../assets/viridescent_venerer.png'),
('Crimson Witch of Flames', '../assets/crimson_witch_of_flames.png'),
('Lavawalker', '../assets/lavawalker.png'),
('Noblesse Oblige', '../assets/noblesse_oblige.png'),
('Bloodstained Chivalry', '../assets/bloodstained_chivalry.png'),
('Archaic Petra', '../assets/archaic_petra.png'),
('Retracing Bolide', '../assets/retracing_bolide.png'),
('Blizzard Strayer', '../assets/blizzard_strayer.png'),
('Heart of Depth', '../assets/heart_of_depth.png'),
('Tenacity of the Millelith', '../assets/tenacity_of_the_millelith.png'),
('Pale Flame', '../assets/pale_flame.png'),
('Emblem of Severed Fate', '../assets/emblem_of_severed_fate.png'),
('Shimenawa''s Reminiscence', '../assets/shimenawas_reminiscence.png');

INSERT INTO set_pieces
(piece_name)
VALUES
('Flower'),
('Feather'),
('Sands'),
('Goblet'),
('Circlet');

INSERT INTO stats_list
(stat_name, stat_mainstat_value, stat_substat_average)
VALUES
('ATK %', 46.6, 5),
('ATK', 311, 16.5),
('HP %', 46.6, 5),
('HP', 4780, 254),
('DEF %', 46.6, 6.2),
('DEF', 0, 19.5),
('CRIT RATE %', 31.1, 3.3),
('CRIT DAMAGE %', 62.2, 6.6),
('ENERGY RECHARGE %', 51.8, 5.5),
('ELEMENTAL MASTERY', 187, 19.5),
('ANEMO DAMAGE %', 46.6, 0),
('PYRO DAMAGE %', 46.6, 0),
('CRYO DAMAGE %', 46.6, 0),
('HYDRO DAMAGE %', 46.6, 0),
('ELECTRO DAMAGE %', 46.6, 0),
('GEO DAMAGE %', 46.6, 0),
('PHYSICAL DAMAGE %', 46.6, 0),
('HEALING BONUS %', 46.6, 0);

INSERT INTO user_artifacts
(set_name, set_piece, 
mainstat_type, substat1_type, substat2_type, substat3_type, substat4_type,
mainstat_value, substat1_value, substat2_value, substat3_value, substat4_value)
VALUES
('Emblem of Severed Fate', 'Flower',
'HP', 'DEF', 'DEF %', 'HP', 'ATK %',
4780, 42, 7.3, 777, 11.7),
('Viridescent Venerer', 'Feather', 
'ATK', 'HP %', 'ELEMENTAL MASTERY', 'CRIT RATE %', 'CRIT DAMAGE %',
311, 5.8, 68, 9.7, 6.2),
('Emblem of Severed Fate', 'Sands', 
'ATK %', 'ATK', 'CRIT RATE %', 'CRIT DAMAGE %', 'ENERGY RECHARGE %',
46.6, 16, 6.6, 27.2, 6.5),
('Thundering Fury', 'Goblet', 
'ANEMO DAMAGE %', 'ENERGY RECHARGE %', 'ELEMENTAL MASTERY', 'HP', 'ATK %',
46.6, 15.5, 44, 269, 4.7),
('Viridescent Venerer', 'Circlet', 
'CRIT RATE %', 'CRIT DAMAGE %', 'ATK', 'HP', 'ELEMENTAL MASTERY',
31.1, 14.8, 37, 299, 63);