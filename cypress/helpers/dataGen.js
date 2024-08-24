import {en, Faker} from '@faker-js/faker';

class DataGen {
    faker = new Faker({locale: en});
    email = this.faker.internet.email();

    randomEmail() {
        return this.email;
    }

    randomName() {
        return `${this.faker.name.firstName()} ${this.faker.name.lastName()}`;
    }

    random8Digits() {
        return this.faker.datatype.number({min: 10000000, max: 99999999}).toString();
    }
}

export const dataGen = new DataGen();
