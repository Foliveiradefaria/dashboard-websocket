import { Test, TestingModule } from '@nestjs/testing'
import { ClientsController } from './clients.controller'
import { ClientsService } from './clients.service'

describe('ClientsController', () => {
  let controller: ClientsController

  const mockFindOne = jest.fn()
  const mockFindByGender = jest.fn()

  const mockClientsService = {
    findAll: async () => [{ id: 'id', name: 'name', gender: 'gender' }],
    findByGender: mockFindByGender,
    findOne: mockFindOne,
    create: async () => [{ id: 'id', name: 'name', gender: 'gender' }]
  }

  beforeEach(async () => {
    jest.resetAllMocks()
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [{ provide: ClientsService, useValue: mockClientsService }]
    }).compile()

    controller = module.get<ClientsController>(ClientsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('findOne', () => {
    describe('when client is found', () => {
      const clientId = 'id'

      const mockResult = {
        id: clientId,
        name: 'name',
        gender: 'gender'
      }

      beforeEach(() => {
        mockFindOne.mockResolvedValue(mockResult)
      })

      it('Should call service with correct params', async () => {
        await controller.findOne(clientId)
        expect(mockFindOne).toHaveBeenCalledWith(clientId)
      })

      it('Should return correct response', async () => {
        const result = await controller.findOne(clientId)
        expect(result).toEqual(mockResult)
      })
    })
    describe('when client is not found', () => {
      const clientId = 'id2'

      beforeEach(() => {
        mockFindOne.mockResolvedValue(null)
      })

      it('should throw an error', async () => {
        await expect(controller.findOne(clientId)).rejects.toThrow(
          'Client not found'
        )
      })
    })
  })

  describe('findByGender', () => {
    describe('when client is found by gender', () => {
      const gender = 'gender'

      const mockResult = {
        id: 'id',
        name: 'name',
        gender: gender
      }

      beforeEach(() => {
        mockFindByGender.mockResolvedValue(mockResult)
      })

      it('Should call service with correct params', async () => {
        await controller.findByGender(gender)
        expect(mockFindByGender).toHaveBeenCalledWith(gender)
      })

      it('Should return correct response', async () => {
        const result = await controller.findByGender(gender)
        expect(result).toEqual(mockResult)
      })
    })
    describe('when client is not found by gender', () => {
      const gender = 'wrongGender'

      beforeEach(() => {
        mockFindByGender.mockResolvedValue(null)
      })

      it('should throw an error', async () => {
        await expect(controller.findByGender(gender)).rejects.toThrow(
          'Clients not found'
        )
      })
    })
  })
})
