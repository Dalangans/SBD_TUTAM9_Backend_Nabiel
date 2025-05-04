const contactRepository = require("../repositories/contact.repository");
const baseResponse = require("../utils/baseResponse.util");

exports.createContact = async (req, res) => {
    const { name, phone } = req.body;
    try {
        const newContact = await contactRepository.createContact({ name, phone });
        return baseResponse(res, true, 201, "Contact created", {
            ...newContact,
            created_at: newContact.created_at,
            updated_at: newContact.updated_at,
        });
    } catch (error) {
        return baseResponse(res, false, 500, "Error creating contact", error);
    }
};

exports.getContacts = async (req, res) => {
    try {
        const contacts = await contactRepository.getContacts();
        return baseResponse(res, true, 200, "Contacts found", contacts);
    } catch (error) {
        return baseResponse(res, false, 500, "Error retrieving contacts", error);
    }
};

exports.updateContact = async (req, res) => {
    const { id, name, phone } = req.body;
    try {
        const contact = await contactRepository.updateContact(id, { name, phone });
        if (!contact) {
            return baseResponse(res, false, 404, "Contact not found", null);
        }
        return baseResponse(res, true, 200, "Contact updated", {
            ...contact,
            updated_at: contact.updated_at,
        });
    } catch (error) {
        return baseResponse(res, false, 500, "Error updating contact", error);
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const contact = await contactRepository.deleteContact(req.params.id);
        if (!contact) {
            return baseResponse(res, false, 404, "Contact not found", null);
        }
        return baseResponse(res, true, 200, "Contact deleted", contact);
    } catch (error) {
        return baseResponse(res, false, 500, "Error deleting contact", error);
    }
};
