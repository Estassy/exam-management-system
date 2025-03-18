-- 🏷️ Ajouter des promotions
INSERT INTO promotions (id, name) VALUES
                                      (gen_random_uuid(), 'Licence 1'),
                                      (gen_random_uuid(), 'Master 2'),
                                      (gen_random_uuid(), 'Doctorat')
    ON CONFLICT (id) DO NOTHING;

-- 👤 Ajouter des utilisateurs
INSERT INTO users (id, username, password, first_name, last_name, role, promotion_id, active) VALUES
                                                                                                  (gen_random_uuid(), 'ad','admin','administrateur', 'ad', 'ADMIN', TRUE ),
                                                                                                  (gen_random_uuid(), 'p','porf', 'proffesseur', 'p', 'TEACHER', TRUE),
                                                                                                  (gen_random_uuid(), 'etu','Marc', 'BATABA', 'etu', 'STUDENT', TRUE)
    ON CONFLICT (id) DO NOTHING;
