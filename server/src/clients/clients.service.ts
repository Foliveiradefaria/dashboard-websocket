import { Injectable } from '@nestjs/common'
import { Client } from './entity/client.entity'
import { CreateClientDto } from './dto/create.client.dto'
import { randomUUID } from 'crypto'

@Injectable()
export class ClientsService {
  private clients: Client[] = []

  async findAll(sort: 'asc' | 'desc' = 'desc', limit: number) {
    const sortAsc = (a: Client, b: Client) => (a.name > b.name ? 1 : -1)
    const sortDesc = (a: Client, b: Client) => (a.name < b.name ? 1 : -1)

    return sort === 'asc'
      ? this.clients.sort(sortAsc).slice(0, limit)
      : this.clients.sort(sortDesc).slice(0, limit)
  }

  async findByGender(gender: string) {
    return this.clients.filter((client) => client.gender === gender)
  }

  async findOne(id: string) {
    return this.clients.filter((client) => client.id === id)
  }

  async create(createClientDto: CreateClientDto) {
    const newClient = { ...createClientDto, id: randomUUID() }
    this.clients.push(newClient)

    return newClient
  }
}
