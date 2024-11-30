const MemberService = require('../services/memberService'); // Importar el servicio de miembros

// Obtener miembros con paginación
exports.getMembers = async (req, res, next) => {
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;

  try {
    const members = await MemberService.getMembers({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: members,
      message: "Successfully received members",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

//Members by ID
exports.getMemberById = async (req, res, next) => {
  const memberId = req.query.id; // El ID del miembro lo recibimos de los parámetros de la URL

  try {
    const member = await MemberService.getMemberById(memberId); // Llamada a tu servicio para obtener el miembro por ID
    if (!member) {
      return res.status(404).json({ status: 404, message: 'Member not found' });
    }
    return res.status(200).json({ status: 200, data: member, message: 'Successfully received member' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Crear un nuevo miembro
exports.createMember = async (req, res, next) => {
  const member = {
    member_id: req.body.member_id,
    name: req.body.name,
    ticket_id: req.body.ticket_id,
    monto: req.body.monto,
    paid: req.body.paid || false,
  };

  try {
    const createdMember = await MemberService.createMember(member);
    return res.status(201).json({ createdMember, message: "Successfully created member" });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ status: 400, message: "Member creation was unsuccessful" });
  }
};

// Actualizar un miembro
exports.updateMember = async (req, res, next) => {
  const member = {
    member_id: req.body.member_id,
    name: req.body.name || null,
    monto: req.body.monto || null,
    paid: req.body.paid || null,
  };

  try {
    const updatedMember = await MemberService.updateMember(member);
    return res.status(200).json({ status: 200, data: updatedMember, message: "Successfully updated member" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Eliminar un miembro
exports.deleteMember = async (req, res, next) => {
  const id = req.query.id;

  try {
    const deleted = await MemberService.deleteMember(id);
    return res.status(200).send("Successfully deleted");
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};