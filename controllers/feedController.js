const prisma = require('../infrastructure/db');

// GET /feeds
module.exports.get_feeds = async (req, res) => {
  try {

    return await res.status(200).json(await prisma.feed.findMany());

  } catch (error) {
    return await res.status(500).json(error);
  }
};

// POST /feed
module.exports.add_feed = async (req, res) => {
  try {
    const { feed_name, general_information, kind, sector} = req.body;

    // console.log(req.file)
    
    const data = {
      feed_name: feed_name,
      general_information: general_information,
      kind: kind,
      sector: sector,
      imagem: req.file.path
    }

    // console.log(imagem)

    const newFeed = await prisma.feed.create({
      data: data,
    })

    return await res.status(201).json(newFeed);

  } catch (error) {
    return await res.status(500).json(error);
  }
};

// PUT/feed
module.exports.update_feed = async (req, res) => {
  const { id } = req.params;
  try {
    const { feed_name, general_information, kind, sector, imagem } = req.body;

    const isFeedExists = await prisma.feed.findUnique({
      where: {
        id
      }
    });

    if (!isFeedExists) {
      return await res.status(404).json({ message: "A noticia que pretende actualizar nao existe!" });
    }

    const updatedFeed = await prisma.feed.update({
      where: {
        id
      },

      data: {
        feed_name: feed_name,
        general_information: general_information,
        kind: kind,
        sector: sector,
        imagem: imagem
      }
    })
    return await res.status(200).json(updatedFeed);

  } catch (error) {
    return await res.status(500).json(error);
  }
};


// DELETE/feed
module.exports.delete_feed = async (req, res) => {
  const { id } = req.params;

  try {
    const isFeedExists = await prisma.feed.findUnique({
      where: {
        id
      }
    });

    if (!isFeedExists) {
      return await res.status(404).json({ message: "A noticia que pretende apagar nao existe!" });
    }

    const deletedFeed = await prisma.feed.delete({
      where: {
        id
      }
    })
    // return await res.status(200).json({success:true});
    return await res.status(200).json({ deletedFeed });

  } catch (error) {
    return await res.status(500).json(error);
  }
};