-- ============================================================
-- 00 - VERIFICAR EL ENTORNO
-- Corré esto PRIMERO. Si las 5 pruebas pasan, el resto va a funcionar.
-- ============================================================

-- 1. ¿Estoy conectado y a qué motor?
SELECT VERSION() AS version_del_motor;

-- 2. ¿Con qué usuario entré?
SELECT CURRENT_USER() AS usuario;

-- 3. ¿Qué bases hay en este servidor?
SHOW DATABASES;

-- 4. ¿Puedo crear y borrar? (necesario para el resto de la clase)
CREATE DATABASE IF NOT EXISTS prueba_de_permisos;
DROP DATABASE prueba_de_permisos;
SELECT 'puedo crear y borrar bases' AS permisos;

-- 5. ¿Los acentos y las eñes van a andar bien?
SELECT 'ñandú, José, Gómez' AS prueba_de_acentos;
