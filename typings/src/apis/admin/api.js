"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAPI = void 0;
const jrpcapi_1 = require("../../common/jrpcapi");
/**
 * Class for interacting with a node's AdminAPI.
 *
 * @category RPCAPIs
 *
 * @remarks This extends the [[JRPCAPI]] class. This class should not be directly called.
 * Instead, use the [[Dijets.addAPI]] function to register this interface with Dijets.
 */
class AdminAPI extends jrpcapi_1.JRPCAPI {
    /**
       * This class should not be instantiated directly. Instead use the [[Dijets.addAPI]]
       * method.
       *
       * @param core A reference to the Dijets class
       * @param baseurl Defaults to the string "/ext/admin" as the path to rpc's baseurl
       */
    constructor(core, baseurl = '/ext/admin') {
        super(core, baseurl);
        /**
           * Assign an API an alias, a different endpoint for the API. The original endpoint will still
           * work. This change only affects this node; other nodes will not know about this alias.
           *
           * @param endpoint The original endpoint of the API. endpoint should only include the part of
           * the endpoint after /ext/
           * @param alias The API being aliased can now be called at ext/alias
           *
           * @returns Returns a Promise<boolean> containing success, true for success, false for failure.
           */
        this.alias = (endpoint, alias) => __awaiter(this, void 0, void 0, function* () {
            const params = {
                endpoint,
                alias,
            };
            return this.callMethod('admin.alias', params)
                .then((response) => response.data.result.success);
        });
        /**
           * Give a blockchain an alias, a different name that can be used any place the blockchain’s
           * ID is used.
           *
           * @param endpoint The blockchain’s ID
           * @param alias Can now be used in place of the blockchain’s ID (in API endpoints, for example)
           *
           * @returns Returns a Promise<boolean> containing success, true for success, false for failure.
           */
        this.aliasChain = (chain, alias) => __awaiter(this, void 0, void 0, function* () {
            const params = {
                chain,
                alias,
            };
            return this.callMethod('admin.aliasChain', params)
                .then((response) => response.data.result.success);
        });
        /**
         * Get all aliases for given blockchain
         *
         * @param chain The blockchain’s ID
         *
         * @returns Returns a Promise<string[]> containing aliases of the blockchain.
         */
        this.getChainAliases = (chain) => __awaiter(this, void 0, void 0, function* () {
            const params = {
                chain,
            };
            return this.callMethod('admin.getChainAliases', params)
                .then((response) => response.data.result.aliases);
        });
        /**
           * Dump the mutex statistics of the node to the specified file.
           *
           * @returns Promise for a boolean that is true on success.
           */
        this.lockProfile = () => __awaiter(this, void 0, void 0, function* () {
            const params = {};
            return this.callMethod('admin.lockProfile', params)
                .then((response) => response.data.result.success);
        });
        /**
           * Dump the current memory footprint of the node to the specified file.
           *
           * @returns Promise for a boolean that is true on success.
           */
        this.memoryProfile = () => __awaiter(this, void 0, void 0, function* () {
            const params = {};
            return this.callMethod('admin.memoryProfile', params)
                .then((response) => response.data.result.success);
        });
        /**
           * Start profiling the cpu utilization of the node. Will dump the profile information into
           * the specified file on stop.
           *
           * @returns Promise for a boolean that is true on success.
           */
        this.startCPUProfiler = () => __awaiter(this, void 0, void 0, function* () {
            const params = {};
            return this.callMethod('admin.startCPUProfiler', params)
                .then((response) => response.data.result.success);
        });
        /**
           * Stop the CPU profile that was previously started.
           *
           * @returns Promise for a boolean that is true on success.
           */
        this.stopCPUProfiler = () => __awaiter(this, void 0, void 0, function* () {
            return this.callMethod('admin.stopCPUProfiler')
                .then((response) => response.data.result.success);
        });
    }
}
exports.AdminAPI = AdminAPI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaXMvYWRtaW4vYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUtBLGtEQUErQztBQUkvQzs7Ozs7OztHQU9HO0FBRUgsTUFBYSxRQUFTLFNBQVEsaUJBQU87SUFnR25DOzs7Ozs7U0FNSztJQUNMLFlBQVksSUFBa0IsRUFBRSxVQUFpQixZQUFZO1FBQUksS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQXJHdEY7Ozs7Ozs7OzthQVNLO1FBQ0wsVUFBSyxHQUFHLENBQU8sUUFBZSxFQUFFLEtBQVksRUFBbUIsRUFBRTtZQUMvRCxNQUFNLE1BQU0sR0FBTztnQkFDakIsUUFBUTtnQkFDUixLQUFLO2FBQ04sQ0FBQztZQUNGLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDO2lCQUMxQyxJQUFJLENBQUMsQ0FBQyxRQUE0QixFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRSxDQUFDLENBQUEsQ0FBQztRQUVGOzs7Ozs7OzthQVFLO1FBQ0wsZUFBVSxHQUFHLENBQU8sS0FBWSxFQUFFLEtBQVksRUFBbUIsRUFBRTtZQUNqRSxNQUFNLE1BQU0sR0FBTztnQkFDakIsS0FBSztnQkFDTCxLQUFLO2FBQ04sQ0FBQztZQUNGLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUM7aUJBQy9DLElBQUksQ0FBQyxDQUFDLFFBQTRCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFFLENBQUMsQ0FBQSxDQUFDO1FBRUY7Ozs7OztXQU1HO1FBQ0gsb0JBQWUsR0FBRyxDQUFPLEtBQVksRUFBb0IsRUFBRTtZQUN6RCxNQUFNLE1BQU0sR0FBTztnQkFDakIsS0FBSzthQUNOLENBQUM7WUFDRixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUUsTUFBTSxDQUFDO2lCQUNwRCxJQUFJLENBQUMsQ0FBQyxRQUE0QixFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRSxDQUFDLENBQUEsQ0FBQztRQUVGOzs7O2FBSUs7UUFDTCxnQkFBVyxHQUFHLEdBQTBCLEVBQUU7WUFDeEMsTUFBTSxNQUFNLEdBQU8sRUFBRSxDQUFDO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUM7aUJBQ2hELElBQUksQ0FBQyxDQUFDLFFBQTRCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFFLENBQUMsQ0FBQSxDQUFDO1FBRUY7Ozs7YUFJSztRQUNMLGtCQUFhLEdBQUcsR0FBMEIsRUFBRTtZQUMxQyxNQUFNLE1BQU0sR0FBTyxFQUFFLENBQUM7WUFDdEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQztpQkFDbEQsSUFBSSxDQUFDLENBQUMsUUFBNEIsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUUsQ0FBQyxDQUFBLENBQUM7UUFFRjs7Ozs7YUFLSztRQUNMLHFCQUFnQixHQUFHLEdBQTBCLEVBQUU7WUFDN0MsTUFBTSxNQUFNLEdBQU8sRUFBRSxDQUFDO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRSxNQUFNLENBQUM7aUJBQ3JELElBQUksQ0FBQyxDQUFDLFFBQTRCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFFLENBQUMsQ0FBQSxDQUFDO1FBRUY7Ozs7YUFJSztRQUNMLG9CQUFlLEdBQUcsR0FBMEIsRUFBRTtZQUFDLE9BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQztpQkFDcEYsSUFBSSxDQUFDLENBQUMsUUFBNEIsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7VUFBQSxDQUFDO0lBU2UsQ0FBQztDQUN6RjtBQXhHRCw0QkF3R0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBBUEktQWRtaW5cbiAqL1xuaW1wb3J0IEF2YWxhbmNoZUNvcmUgZnJvbSAnLi4vLi4vYXZhbGFuY2hlJztcbmltcG9ydCB7IEpSUENBUEkgfSBmcm9tICcuLi8uLi9jb21tb24vanJwY2FwaSc7XG5pbXBvcnQgeyBSZXF1ZXN0UmVzcG9uc2VEYXRhIH0gZnJvbSAnLi4vLi4vY29tbW9uL2FwaWJhc2UnO1xuXG5cbi8qKlxuICogQ2xhc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBub2RlJ3MgQWRtaW5BUEkuXG4gKlxuICogQGNhdGVnb3J5IFJQQ0FQSXNcbiAqXG4gKiBAcmVtYXJrcyBUaGlzIGV4dGVuZHMgdGhlIFtbSlJQQ0FQSV1dIGNsYXNzLiBUaGlzIGNsYXNzIHNob3VsZCBub3QgYmUgZGlyZWN0bHkgY2FsbGVkLlxuICogSW5zdGVhZCwgdXNlIHRoZSBbW0F2YWxhbmNoZS5hZGRBUEldXSBmdW5jdGlvbiB0byByZWdpc3RlciB0aGlzIGludGVyZmFjZSB3aXRoIEF2YWxhbmNoZS5cbiAqL1xuXG5leHBvcnQgY2xhc3MgQWRtaW5BUEkgZXh0ZW5kcyBKUlBDQVBJIHtcblxuICAvKipcbiAgICAgKiBBc3NpZ24gYW4gQVBJIGFuIGFsaWFzLCBhIGRpZmZlcmVudCBlbmRwb2ludCBmb3IgdGhlIEFQSS4gVGhlIG9yaWdpbmFsIGVuZHBvaW50IHdpbGwgc3RpbGxcbiAgICAgKiB3b3JrLiBUaGlzIGNoYW5nZSBvbmx5IGFmZmVjdHMgdGhpcyBub2RlOyBvdGhlciBub2RlcyB3aWxsIG5vdCBrbm93IGFib3V0IHRoaXMgYWxpYXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgVGhlIG9yaWdpbmFsIGVuZHBvaW50IG9mIHRoZSBBUEkuIGVuZHBvaW50IHNob3VsZCBvbmx5IGluY2x1ZGUgdGhlIHBhcnQgb2ZcbiAgICAgKiB0aGUgZW5kcG9pbnQgYWZ0ZXIgL2V4dC9cbiAgICAgKiBAcGFyYW0gYWxpYXMgVGhlIEFQSSBiZWluZyBhbGlhc2VkIGNhbiBub3cgYmUgY2FsbGVkIGF0IGV4dC9hbGlhc1xuICAgICAqXG4gICAgICogQHJldHVybnMgUmV0dXJucyBhIFByb21pc2U8Ym9vbGVhbj4gY29udGFpbmluZyBzdWNjZXNzLCB0cnVlIGZvciBzdWNjZXNzLCBmYWxzZSBmb3IgZmFpbHVyZS5cbiAgICAgKi9cbiAgYWxpYXMgPSBhc3luYyAoZW5kcG9pbnQ6c3RyaW5nLCBhbGlhczpzdHJpbmcpOlByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgIGNvbnN0IHBhcmFtczphbnkgPSB7XG4gICAgICBlbmRwb2ludCxcbiAgICAgIGFsaWFzLFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuY2FsbE1ldGhvZCgnYWRtaW4uYWxpYXMnLCBwYXJhbXMpXG4gICAgICAudGhlbigocmVzcG9uc2U6UmVxdWVzdFJlc3BvbnNlRGF0YSkgPT4gcmVzcG9uc2UuZGF0YS5yZXN1bHQuc3VjY2Vzcyk7XG4gIH07XG5cbiAgLyoqXG4gICAgICogR2l2ZSBhIGJsb2NrY2hhaW4gYW4gYWxpYXMsIGEgZGlmZmVyZW50IG5hbWUgdGhhdCBjYW4gYmUgdXNlZCBhbnkgcGxhY2UgdGhlIGJsb2NrY2hhaW7igJlzXG4gICAgICogSUQgaXMgdXNlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbmRwb2ludCBUaGUgYmxvY2tjaGFpbuKAmXMgSURcbiAgICAgKiBAcGFyYW0gYWxpYXMgQ2FuIG5vdyBiZSB1c2VkIGluIHBsYWNlIG9mIHRoZSBibG9ja2NoYWlu4oCZcyBJRCAoaW4gQVBJIGVuZHBvaW50cywgZm9yIGV4YW1wbGUpXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBSZXR1cm5zIGEgUHJvbWlzZTxib29sZWFuPiBjb250YWluaW5nIHN1Y2Nlc3MsIHRydWUgZm9yIHN1Y2Nlc3MsIGZhbHNlIGZvciBmYWlsdXJlLlxuICAgICAqL1xuICBhbGlhc0NoYWluID0gYXN5bmMgKGNoYWluOnN0cmluZywgYWxpYXM6c3RyaW5nKTpQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgICBjb25zdCBwYXJhbXM6YW55ID0ge1xuICAgICAgY2hhaW4sXG4gICAgICBhbGlhcyxcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLmNhbGxNZXRob2QoJ2FkbWluLmFsaWFzQ2hhaW4nLCBwYXJhbXMpXG4gICAgICAudGhlbigocmVzcG9uc2U6UmVxdWVzdFJlc3BvbnNlRGF0YSkgPT4gcmVzcG9uc2UuZGF0YS5yZXN1bHQuc3VjY2Vzcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgYWxpYXNlcyBmb3IgZ2l2ZW4gYmxvY2tjaGFpblxuICAgKlxuICAgKiBAcGFyYW0gY2hhaW4gVGhlIGJsb2NrY2hhaW7igJlzIElEXG4gICAqXG4gICAqIEByZXR1cm5zIFJldHVybnMgYSBQcm9taXNlPHN0cmluZ1tdPiBjb250YWluaW5nIGFsaWFzZXMgb2YgdGhlIGJsb2NrY2hhaW4uXG4gICAqL1xuICBnZXRDaGFpbkFsaWFzZXMgPSBhc3luYyAoY2hhaW46c3RyaW5nKTpQcm9taXNlPHN0cmluZ1tdPiA9PiB7XG4gICAgY29uc3QgcGFyYW1zOmFueSA9IHtcbiAgICAgIGNoYWluLFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuY2FsbE1ldGhvZCgnYWRtaW4uZ2V0Q2hhaW5BbGlhc2VzJywgcGFyYW1zKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOlJlcXVlc3RSZXNwb25zZURhdGEpID0+IHJlc3BvbnNlLmRhdGEucmVzdWx0LmFsaWFzZXMpO1xuICB9O1xuXG4gIC8qKlxuICAgICAqIER1bXAgdGhlIG11dGV4IHN0YXRpc3RpY3Mgb2YgdGhlIG5vZGUgdG8gdGhlIHNwZWNpZmllZCBmaWxlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgUHJvbWlzZSBmb3IgYSBib29sZWFuIHRoYXQgaXMgdHJ1ZSBvbiBzdWNjZXNzLlxuICAgICAqL1xuICBsb2NrUHJvZmlsZSA9IGFzeW5jICgpOlByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgIGNvbnN0IHBhcmFtczphbnkgPSB7fTtcbiAgICByZXR1cm4gdGhpcy5jYWxsTWV0aG9kKCdhZG1pbi5sb2NrUHJvZmlsZScsIHBhcmFtcylcbiAgICAgIC50aGVuKChyZXNwb25zZTpSZXF1ZXN0UmVzcG9uc2VEYXRhKSA9PiByZXNwb25zZS5kYXRhLnJlc3VsdC5zdWNjZXNzKTtcbiAgfTtcblxuICAvKipcbiAgICAgKiBEdW1wIHRoZSBjdXJyZW50IG1lbW9yeSBmb290cHJpbnQgb2YgdGhlIG5vZGUgdG8gdGhlIHNwZWNpZmllZCBmaWxlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgUHJvbWlzZSBmb3IgYSBib29sZWFuIHRoYXQgaXMgdHJ1ZSBvbiBzdWNjZXNzLlxuICAgICAqL1xuICBtZW1vcnlQcm9maWxlID0gYXN5bmMgKCk6UHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgY29uc3QgcGFyYW1zOmFueSA9IHt9O1xuICAgIHJldHVybiB0aGlzLmNhbGxNZXRob2QoJ2FkbWluLm1lbW9yeVByb2ZpbGUnLCBwYXJhbXMpXG4gICAgICAudGhlbigocmVzcG9uc2U6UmVxdWVzdFJlc3BvbnNlRGF0YSkgPT4gcmVzcG9uc2UuZGF0YS5yZXN1bHQuc3VjY2Vzcyk7XG4gIH07XG5cbiAgLyoqXG4gICAgICogU3RhcnQgcHJvZmlsaW5nIHRoZSBjcHUgdXRpbGl6YXRpb24gb2YgdGhlIG5vZGUuIFdpbGwgZHVtcCB0aGUgcHJvZmlsZSBpbmZvcm1hdGlvbiBpbnRvXG4gICAgICogdGhlIHNwZWNpZmllZCBmaWxlIG9uIHN0b3AuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBQcm9taXNlIGZvciBhIGJvb2xlYW4gdGhhdCBpcyB0cnVlIG9uIHN1Y2Nlc3MuXG4gICAgICovXG4gIHN0YXJ0Q1BVUHJvZmlsZXIgPSBhc3luYyAoKTpQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgICBjb25zdCBwYXJhbXM6YW55ID0ge307XG4gICAgcmV0dXJuIHRoaXMuY2FsbE1ldGhvZCgnYWRtaW4uc3RhcnRDUFVQcm9maWxlcicsIHBhcmFtcylcbiAgICAgIC50aGVuKChyZXNwb25zZTpSZXF1ZXN0UmVzcG9uc2VEYXRhKSA9PiByZXNwb25zZS5kYXRhLnJlc3VsdC5zdWNjZXNzKTtcbiAgfTtcblxuICAvKipcbiAgICAgKiBTdG9wIHRoZSBDUFUgcHJvZmlsZSB0aGF0IHdhcyBwcmV2aW91c2x5IHN0YXJ0ZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBQcm9taXNlIGZvciBhIGJvb2xlYW4gdGhhdCBpcyB0cnVlIG9uIHN1Y2Nlc3MuXG4gICAgICovXG4gIHN0b3BDUFVQcm9maWxlciA9IGFzeW5jICgpOlByb21pc2U8Ym9vbGVhbj4gPT4gdGhpcy5jYWxsTWV0aG9kKCdhZG1pbi5zdG9wQ1BVUHJvZmlsZXInKVxuICAgIC50aGVuKChyZXNwb25zZTpSZXF1ZXN0UmVzcG9uc2VEYXRhKSA9PiByZXNwb25zZS5kYXRhLnJlc3VsdC5zdWNjZXNzKTtcblxuICAvKipcbiAgICAgKiBUaGlzIGNsYXNzIHNob3VsZCBub3QgYmUgaW5zdGFudGlhdGVkIGRpcmVjdGx5LiBJbnN0ZWFkIHVzZSB0aGUgW1tBdmFsYW5jaGUuYWRkQVBJXV1cbiAgICAgKiBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29yZSBBIHJlZmVyZW5jZSB0byB0aGUgQXZhbGFuY2hlIGNsYXNzXG4gICAgICogQHBhcmFtIGJhc2V1cmwgRGVmYXVsdHMgdG8gdGhlIHN0cmluZyBcIi9leHQvYWRtaW5cIiBhcyB0aGUgcGF0aCB0byBycGMncyBiYXNldXJsXG4gICAgICovXG4gIGNvbnN0cnVjdG9yKGNvcmU6QXZhbGFuY2hlQ29yZSwgYmFzZXVybDpzdHJpbmcgPSAnL2V4dC9hZG1pbicpIHsgc3VwZXIoY29yZSwgYmFzZXVybCk7IH1cbn1cbiJdfQ==