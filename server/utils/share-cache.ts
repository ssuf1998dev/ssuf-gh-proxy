import TTLCache from "@isaacs/ttlcache";

const shareCache = new TTLCache({ ttl: 1000 * 60 * 60 * 10 });

export default shareCache;
