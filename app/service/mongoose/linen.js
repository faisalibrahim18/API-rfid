const Linen = require('../../api/v1/linen/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const createLinen = async (req) => {
    const { name } = req.body;

    const checkName = await Linen.findOne({ name: name })

    if (checkName) throw new BadRequestError('Name has already been registered');

    const result = await Linen.create({
        name,
    })

    return result;
}

const getAllLinen = async (req) => {
    const result = await Linen.find()
    .select('name')

    if (!result) throw new NotFoundError('Linen not found');

    return result;
} 

const getOneLinen = async (req) =>{
    const { id } = req.params;

    const result = await Linen.findOne({ _id: id })
    .select('name')

    if (!result) throw new NotFoundError('Linen not found');

    return result;
} 

const updateLinen = async (req) => {
    const { id } = req.params;
    const { name } = req.body;

    const checkName = await Linen.findOne({ name, _id : { $ne: id} });
    if (checkName)  throw new BadRequestError('Linen name already exists');

    const result = await Linen.findByIdAndUpdate(
        { _id : id },
        { name },
        { new: true, runValidators: true }
    )

    if (!result) throw new NotFoundError(`Linen name id ${id} not found`);

    return result;
}

const deleteLinen = async (req) => {
    const { id } = req.params;
    
    const result = await Linen.findByIdAndDelete({ _id: id})

    if (!result) throw new NotFoundError(`Linen name ${id} not found`);
    
    return result;
}
module.exports = { createLinen, getAllLinen, getOneLinen, updateLinen, deleteLinen };