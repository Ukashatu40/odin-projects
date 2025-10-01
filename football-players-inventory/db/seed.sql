INSERT INTO categories (name, description) VALUES
('Goalkeeper', 'Players who guard the goal'),
('Defender', 'Players who protect the defensive zone'),
('Midfielder', 'Players who control the midfield'),
('Forward', 'Players who focus on scoring goals');

INSERT INTO players (name, category_id, position, club, nationality, age) VALUES
('Alisson Becker', 1, 'Goalkeeper', 'Liverpool', 'Brazil', 33),
('Virgil van Dijk', 2, 'Center Back', 'Liverpool', 'Netherlands', 34),
('Kevin De Bruyne', 3, 'Attacking Midfielder', 'Manchester City', 'Belgium', 34),
('Erling Haaland', 4, 'Striker', 'Manchester City', 'Norway', 25);