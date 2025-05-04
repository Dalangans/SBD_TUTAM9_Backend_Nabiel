const db = require("../database/pg.database");
const baseResponse = require("../utils/baseResponse.util");

exports.createContact = async (contact) => {
    try {
        const res = await db.query(
            "INSERT INTO contacts (name, phone, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *",
            [contact.name, contact.phone]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
        throw error;
    }
};

exports.getContacts = async () => {
    try {
        const res = await db.query("SELECT * FROM contacts");
        return res.rows;
    } catch (error) {
        console.error("Error executing query", error);
        throw error;
    }
};

exports.updateContact = async (id, contact) => {
    try {
        const query = `
            UPDATE contacts 
            SET name = $1, phone = $2, updated_at = NOW() 
            WHERE id = $3 
            RETURNING *`;
        const params = [contact.name, contact.phone, id];
        const res = await db.query(query, params);
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
        throw error;
    }
};

exports.deleteContact = async (id) => {
    try {
        const res = await db.query("DELETE FROM contacts WHERE id = $1 RETURNING *", [id]);
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
        throw error;
    }
};