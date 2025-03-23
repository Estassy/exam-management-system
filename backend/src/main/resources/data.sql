INSERT INTO promotions (id, name) VALUES
                                      (gen_random_uuid(), 'Licence 1'),
                                      (gen_random_uuid(), 'Master 2'),
                                      (gen_random_uuid(), 'Doctorat')
ON CONFLICT (id) DO NOTHING;

INSERT INTO promotions (id, name) VALUES
                                      ('11111111-aaaa-aaaa-aaaa-111111111111', 'L3 Informatique'),
                                      ('11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'M1 Data Science'),
                                      ('22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'M2 Informatique'),
                                      ('33333333-cccc-cccc-cccc-cccccccccccc', 'L3 Maths'),
                                      ('44444444-dddd-dddd-dddd-dddddddddddd', 'M1 Génie Logiciel')
ON CONFLICT (id) DO NOTHING;


-- 👨‍🎓 Étudiants – L3 Informatique
INSERT INTO users (id, username, first_name, last_name, password, role, active, promotion_id) VALUES
                                                                                                  (gen_random_uuid(), 'marc', 'Marc', 'BATABA', 'etu', 'STUDENT', TRUE, '11111111-aaaa-aaaa-aaaa-111111111111'),
                                                                                                  (gen_random_uuid(), 'abir', 'Abir', 'TAMOUCH', 'etu', 'STUDENT', TRUE, '11111111-aaaa-aaaa-aaaa-111111111111'),
                                                                                                  (gen_random_uuid(), 'rizlene', 'Rizlene', 'BENAYED', 'etu', 'STUDENT', TRUE, '11111111-aaaa-aaaa-aaaa-111111111111'),
                                                                                                  (gen_random_uuid(), 'amine', 'Amine', 'SAADI', 'etu', 'STUDENT', TRUE, '11111111-aaaa-aaaa-aaaa-111111111111'),
                                                                                                  (gen_random_uuid(), 'nora', 'Nora', 'MOKHTARI', 'etu', 'STUDENT', TRUE, '11111111-aaaa-aaaa-aaaa-111111111111')
ON CONFLICT (username) DO NOTHING;

-- 👩‍🎓 Étudiants – M1 Data Science
INSERT INTO users (id, username, first_name, last_name, password, role, active, promotion_id) VALUES
                                                                                                  (gen_random_uuid(), 'yasmine', 'Yasmine', 'KHEDIR', 'etu', 'STUDENT', TRUE, '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
                                                                                                  (gen_random_uuid(), 'mehdi', 'Mehdi', 'ZIANI', 'etu', 'STUDENT', TRUE, '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
                                                                                                  (gen_random_uuid(), 'sami', 'Sami', 'DJELLOUL', 'etu', 'STUDENT', TRUE, '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
                                                                                                  (gen_random_uuid(), 'mira', 'Mira', 'ZOUAOUI', 'etu', 'STUDENT', TRUE, '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
                                                                                                  (gen_random_uuid(), 'kamel', 'Kamel', 'BELLAHCENE', 'etu', 'STUDENT', TRUE, '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa')
    ON CONFLICT (username) DO NOTHING;


-- 👩‍💻 Étudiants – M2 Informatique
INSERT INTO users (id, username, first_name, last_name, password, role, active, promotion_id) VALUES
                                                                                                  (gen_random_uuid(), 'sarah', 'Sarah', 'NOUR', 'etu', 'STUDENT', TRUE, '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
                                                                                                  (gen_random_uuid(), 'adam', 'Adam', 'REZIG', 'etu', 'STUDENT', TRUE, '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
                                                                                                  (gen_random_uuid(), 'ines', 'Inès', 'CHERIF', 'etu', 'STUDENT', TRUE, '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
                                                                                                  (gen_random_uuid(), 'ali', 'Ali', 'YAHIA', 'etu', 'STUDENT', TRUE, '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
                                                                                                  (gen_random_uuid(), 'leila', 'Leila', 'MANSOUR', 'etu', 'STUDENT', TRUE, '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb')
    ON CONFLICT (username) DO NOTHING;

INSERT INTO users(id, username, first_name, last_name, password, role, active, promotion_id) VALUES
                                                                                                 (gen_random_uuid(), 'ad','admin','administrateur', 'ad', 'ADMIN', TRUE, NULL ),
                                                                                                 (gen_random_uuid(), 'p','davide', 'GUASTELLA', 'p', 'TEACHER', TRUE, NULL )
ON CONFLICT (username) DO NOTHING;




-- ✅ QUESTIONS
INSERT INTO questions (id, question_text, option1, option2, option3, option4, right_answer, type) VALUES
                                                                                                      ('11111111-1111-1111-1111-111111111111', 'Combien font 2 + 2 ?', '2', '3', '4', '5', '4', 'MCQ'),
                                                                                                      ('22222222-2222-2222-2222-222222222222', 'Capitale de la France ?', 'Londres', 'Madrid', 'Paris', 'Rome', 'Paris', 'MCQ'),
                                                                                                      ('33333333-3333-3333-3333-333333333333', 'Le soleil est une étoile ?', 'true', 'false', NULL, NULL, 'true', 'TRUE_FALSE'),
                                                                                                      ('44444444-4444-4444-4444-444444444444', 'Combien font 5 x 6 ?', '30', '25', '20', '15', '30', 'MCQ'),
                                                                                                      ('55555555-5555-5555-5555-555555555555', 'Quel est l’inverse de 2 ?', '0.5', '2', '4', '1', '0.5', 'MCQ'),
                                                                                                      ('66666666-6666-6666-6666-666666666666', 'HTML est un langage ?', 'Oui', 'Non', NULL, NULL, 'Oui', 'TRUE_FALSE')
    ON CONFLICT (id) DO NOTHING;

-- ✅ TEMPLATES
INSERT INTO exam_templates (id, title) VALUES
                                           ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Modèle Maths'),
                                           ('bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Modèle Informatique'),
                                           ('ccccccc3-cccc-cccc-cccc-cccccccccccc', 'Modèle Culture G')
    ON CONFLICT (id) DO NOTHING;

INSERT INTO exam_template_questions (template_id, question_id) VALUES
                                                                   ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111'),
                                                                   ('bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222'),
                                                                   ('bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333')
ON CONFLICT DO NOTHING;

