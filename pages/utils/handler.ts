import { NextApiRequest, NextApiResponse } from "next"
import { connect } from './connection'
import { ResponseFuncs } from './types'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    //menangkap metode permintaan, kami mengetiknya sebagai kunci ResponseFunc untuk mengurangi pengetikan nanti
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

    //function for catch errors
    const catcher = (error: Error) => res.status(400).json({ error })

    // Potential Response
    const handleCase: ResponseFuncs = {
        // RESPONSE FOR GET REQUESTS
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Todo } = await connect() //konek database
            res.json(await Todo.find({}).catch(catcher))
        },

        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Todo } = await connect()
            res.json(await Todo.create(req.body).catch(catcher))
        },
    }

    // Check if there is a response for the particular method, if so invoke it, if not response with an error

    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({message: "No Response for this request"})

}

export default handler