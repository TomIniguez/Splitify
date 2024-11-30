const Member = require('../db/models/members'); // Modelo de Miembro

// Obtener miembros con paginación
exports.getMembers = async function (query, page, limit) {
  const options = {
    page: page || 1,
    limit: limit || 10,
  };

  try {
    const members = await Member.paginate(query, options); // Paginar miembros
    return members;
  } catch (e) {
    console.error('Error al paginar miembros:', e);
    throw Error('Error mientras se paginaban los miembros.');
  }
};

// Obtener un miembro por su ID
exports.getMemberById = async (memberId) => {
  try {
    const member = await Member.findById(memberId); // Usamos `findById` de Mongoose
    return member;
  } catch (e) {
    throw new Error('Error fetching member by ID: ' + e.message);
  }
};

// Crear un nuevo miembro
exports.createMember = async function (member) {
  const newMember = new Member({
    member_id: member.member_id,
    name: member.name,
    ticket_id: member.ticket_id,
    monto: member.monto,
    paid: member.paid || false,
  });

  try {
    const savedMember = await newMember.save();
    return savedMember;
  } catch (e) {
    console.error('Error al crear miembro:', e);
    throw Error('Error mientras se creaba el miembro.');
  }
};

// Actualizar un miembro
exports.updateMember = async function (member) {
  try {
    const oldMember = await Member.findOne({ member_id: member.member_id });
    if (!oldMember) {
      return false;
    }

    oldMember.name = member.name || oldMember.name;
    oldMember.monto = member.monto || oldMember.monto;
    oldMember.paid = member.paid || oldMember.paid;

    const updatedMember = await oldMember.save();
    return updatedMember;
  } catch (e) {
    console.error('Error al actualizar miembro:', e);
    throw Error('Error mientras se actualizaba el miembro.');
  }
};

// Eliminar un miembro
exports.deleteMember = async function (id) {
  try {
    const deleted = await Member.deleteOne({ _id: id });
    if (deleted.deletedCount === 0) {
      throw Error('No se pudo eliminar el miembro.');
    }
    return deleted;
  } catch (e) {
    console.error('Error al eliminar miembro:', e);
    throw Error('Error mientras se eliminaba el miembro.');
  }
};